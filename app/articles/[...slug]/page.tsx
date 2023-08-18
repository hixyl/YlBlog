import {
  getAllMetaData,
  getTargetPageMetaDatas,
  isSuccessful,
} from "@/utils/posts-md";
import Header from "@/components/Header/header";
import { menuItems } from "@/config/menuItems";
import css from "./articleList.module.css";
import Sidebar from "@/components/Sidebar/sidebar";
import { Constants } from "@/utils/Constants";
import Pagination from "@/components/Pagination/pagination";
import TitleCard from "@/components/TitleCard/titleCard";
import getAllCategries from "@/utils/categraies";
import Category from "@/components/Category/category";
import { Metadata, ResolvingMetadata } from "next";
import BackTop from "@/components/BackTop/backTop";
import { generateArticleListJson } from "@/utils/searchUtil";
import generateRssFeed from "@/utils/generateRSSFeed";
import BottomBar from "@/components/BottomBar/bottomBar";

const postsDir = Constants.postDir;

export async function generateMetadata(
  { params }: PageRoute,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `${decodeURIComponent(params.slug[0]) !== 'all'? decodeURIComponent(params.slug[0]) : '全部文章'} - ${(await parent)?.title?.absolute}`,
    description: '文章列表-A list of articles published on this site.',
  };
}

export default async function ArticleIndex({ params }: PageRoute) {
  const fileMetaData = await getAllMetaData(
    postsDir,
    Constants.pageSize,
    decodeURIComponent(params.slug[0])
  );
  const targePageMetaData = await getTargetPageMetaDatas(
    fileMetaData,
    Number(params.slug[1]),
    Constants.pageSize
  );
  const categories = await getAllCategries();
  return (
    <div className={css.pageBody}>
      <Header menuItemList={menuItems} currentSelectedLabel= '文章' />
      <div className={css.pageBodyMain}>
        <Sidebar />
        <div className={`${css.bodyContanier} scrollContent`}>
          <Category categories={categories} currentCategory={decodeURIComponent(params.slug[0])} />
          <div className={css.articleContainer}>
            <div className={css.pageList}>
              {targePageMetaData &&
                targePageMetaData.map((metaData) => (
                  <>
                    <TitleCard
                      key={metaData.attributes.id}
                      postsdir={postsDir}
                      id={metaData.attributes.id}
                      title={metaData.attributes.title}
                      description={metaData.attributes.description}
                      dateymd={metaData.attributes.dateYMD}
                      dateFriendly={metaData.attributes.dateFriendly}
                      categories={metaData.attributes.newCate}
                      tags={metaData.attributes.tags}
                      images={metaData.images}
                      top = {metaData.attributes.top}
                    />
                  </>
                ))}
            </div>
            <Pagination
              pages={fileMetaData.pages}
              currentPage={Number(params.slug[1])}
              category={params.slug[0]}
            />
            <BottomBar />
          </div>
              
        </div>
      </div>
      <BackTop />
    </div>
  );
}

/**
 * 解析路由获取详细内容
 * @returns
 */
export async function generateStaticParams() {
  const categories = await getAllCategries();
  const fileMetaData = await getAllMetaData(postsDir, Constants.pageSize);
  // 生成搜索json文件
  generateArticleListJson(postsDir, './public/')

  // 生成RSS
  generateRssFeed(fileMetaData);

  const metaData = await Promise.allSettled(
    categories.map((category) =>
      getAllMetaData(postsDir, Constants.pageSize, category)
    )
  );
  const metaDatas = metaData.filter(isSuccessful).map((md) => {
    return [md.value.category, md.value.pages];
  });
  metaDatas.push(["all", fileMetaData.pages]);
  let resArr: { slug: string[] }[] = [];
  metaDatas.forEach(([category, pages]) => {
    let pagesArray = Array.from({ length: Number(pages) }, (_, i) => i + 1);
    pagesArray.forEach((pageNum) => {
      resArr.push({
        slug: [String(category), String(pageNum)],
      });
    });
  });

  return resArr;
}
