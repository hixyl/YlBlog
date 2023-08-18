import { promises as fsp } from "fs";
import path from "path";
import fm, { FrontMatterResult } from "front-matter";
import { remark } from "remark";
import remarkhtml from "remark-html";
import dayjs from "dayjs";
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import hightlightHtml from "./highlightHtml";
import { extractImageLinksFromMarkdown } from "./imagePosts";

const fileExt = "md";

dayjs.extend(tz);
dayjs.extend(utc)

// 获取文件夹相对路径
function absPath(dir: string) {
    return path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);
}

/**
 * 获取文件夹中 Markdown 文件名列表，以数组形式返回
 * @returns
 */
export async function getFileIds(dir = "./") {
    const loc = absPath(dir);
    const files = await fsp.readdir(loc);
    return files
        .filter((fn) => path.extname(fn) === `.${fileExt}`)
        .map((fn) => path.basename(fn, path.extname(fn)));
}



/**
 * 获取单个Markdown文件的元数据
 */
export async function getFileMeta(id: string, dir = "./") {
    const file = path.join(absPath(dir), `${id}.${fileExt}`),
        stat = await fsp.stat(file);
    const data = await fsp.readFile(file, "utf8");
    const matter = fm<MetaAttributes>(data);
    // 日期格式化
    const date = matter.attributes.date || stat.ctime;
    matter.attributes.date = date;
    matter.attributes.dateYMD = dayjs(date).utc().format("YYYY-MM-DD HH:mm:ss");
    matter.attributes.dateFriendly = dayjs(date).utc().format("DD MMMM, YYYY");
    // 覆盖元数据id，使得id只和文件名有关，这样之后元数据的id就没有任何效果了
    matter.attributes.id = id;
    let newCate: string[] = [];
    matter.attributes.categories?.forEach((c) => {
        if (typeof c !== "string") {

            c.forEach((c) => {
                newCate.push(c);
            })
        } else {
            newCate.push(c);
        }
    })
    matter.attributes.newCate = newCate;
    return matter;
}

/**
 * 有了元数据，直接获取文件内容
 */
export async function getFileDataWithMeta(
    matter: FrontMatterResult<MetaAttributes>
) {
    const preHtml = (await remark().use(remarkhtml, { sanitize: false }).process(matter.body)).toString();
    const html = hightlightHtml(preHtml);
    // 计数
    const roundTo = 10,
        readPerMin = 200,
        numFormat = new Intl.NumberFormat("en"),
        count = matter.body
            .replace(/\W/g, " ")
            .replace(/\s+/g, " ")
            .split(" ").length,
        words = Math.ceil(count / roundTo) * roundTo,
        mins = Math.ceil(count / readPerMin);
    // 统计英文单词数（以空格分隔）
    const englishWords = matter.body.split(/\s+/).filter(word => /[a-zA-Z]/.test(word));
    const wordCount = englishWords.length;

    // 统计中文字数
    const chineseCharacters = matter.body.match(/[\u4e00-\u9fa5]/g) || [];
    const chineseCount = chineseCharacters.length;
    const allCount = wordCount + chineseCount;

    matter.attributes.wordcount = `本文字数：${numFormat.format(
        allCount
    )} 字       阅读完需：约 ${numFormat.format(mins)} 分钟`;
    return {
        html,
        ...matter.attributes,
    };
}

/**
 * 获取单个 Markdown 文件的内容
 * @param matter
 * @returns
 */
export async function getFileData(dir = "./", id: string) {
    const matter = await getFileMeta(id, dir);
    return getFileDataWithMeta(matter);
}
export async function getAllMetaData(dir = "./", pageSize = 10, category?: string) {
    const files = await getFileIds(dir);
    const metaData = await Promise.allSettled(
        files.map((id) => getFileMeta(id, dir))
    );

    const metaDataSuccess = metaData.filter(isSuccessful)
        .filter((md) => {
            if (category && category !== "all") {
                return md.value.attributes.newCate.includes(category);
            }
            return true;
        })
        .map((md) => {
            const images = extractImageLinksFromMarkdown(md.value.body);
            let newCate: string[] = [];
            md.value.attributes.categories?.forEach((c) => {
                if (typeof c !== "string") {

                    c.forEach((c) => {
                        newCate.push(c);
                    })
                } else {
                    newCate.push(c);
                }
            })
            return {
                ...md,
                value: {
                    ...md.value,
                    images,
                    newCate
                }
            }
        })

    // 获取分页的总页数
    const pages = Math.ceil(metaDataSuccess.length / pageSize);
    return { metaData: metaDataSuccess, pages, category, itemSize: files.length };
}

// 获取分页的元数据
export async function getTargetPageMetaDatas(
    metaDataSuccess: {
        metaData: PromiseFulfilledResult<FrontMatterResult<MetaAttributes>>[];
        pages: number;
    },
    pageNum = 1,
    pageSize = 10,
    category?: string
) {
    const { metaData } = metaDataSuccess;
    // 保留分页的数据
    const metaDataFiltered = metaData
        .filter(isSuccessful)
        .filter(
            (md) =>
                md.value &&
                md.value.attributes 
                // &&
                // dayjs(md.value.attributes.dateYMD).utc().isBefore(new Date())
        )
        .filter((md) => {
            if (category && category !== "all") {
                return md.value.attributes.newCate.includes(category);
            }
            return true;
        })
        // .map((md) => md.value)
        .map((md) => {
            const images = extractImageLinksFromMarkdown(md.value.body);

            return {
                ...md.value,
                images
            }
        })
        .sort((a, b) =>
            {
                if (a.attributes.top && !b.attributes.top) {
                    return -1; // a 置顶
                } else if (!a.attributes.top && b.attributes.top) {
                    return 1; // b 置顶
                } else {
                    return dayjs(b.attributes.date).isBefore(dayjs(a.attributes.date)) ? -1 : 1;
                }
            }
        )
        .slice((pageNum - 1) * pageSize, pageNum * pageSize);
    return metaDataFiltered;
}

export async function getAllFilesWithMeta(
    metaDataSuccess: {
        metaData: PromiseFulfilledResult<FrontMatterResult<MetaAttributes>>[];
        pages: number;
    },
    pageNum = 1,
    pageSize = 10
) {
    const metaDataFiltered = await getTargetPageMetaDatas(metaDataSuccess, pageNum, pageSize);
    const data = await Promise.allSettled(
        metaDataFiltered.map((md) => getFileDataWithMeta(md))
    );

    return data
        .filter(isSuccessful)
        // .filter((md) => md.value && dayjs(md.value.dateYMD).utc().isBefore(new Date()))
        .map((md) => md.value)
        .sort((a, b) => (dayjs(a.date).utc().isBefore(dayjs(b.date).utc())) ? 1 : -1);
}

export async function getAllFiles(dir: string, pageNum = 1, pageSize = 10) {
    const metaData = (await getAllMetaData(dir, pageSize));
    return getAllFilesWithMeta(metaData, pageNum, pageSize);
}

export function isSuccessful<T>(
    response: PromiseSettledResult<T>
): response is PromiseFulfilledResult<T> {
    return "value" in response;
}

