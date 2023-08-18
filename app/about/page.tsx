import Header from "@/components/Header/header";
import { menuItems } from "@/config/menuItems";
import { getAllMetaData, getFileData, getFileIds } from "@/utils/posts-md";
import css from "./article.module.css";
import BackTop from "@/components/BackTop/backTop";
import Head from "next/head";
import { Metadata, ResolvingMetadata } from "next";
import Toc from "@/components/Toc/toc";
import Sidebar from "@/components/Sidebar/sidebar";
import { Constants } from "@/utils/Constants";
import CopyBlock from "@/components/CopyBlock/copyBlock";
import Tags from "@/components/Tags/tags";
import BottomBar from "@/components/BottomBar/bottomBar";

const postsDir = Constants.postDir;

export async function generateMetadata(
  { params }: RouteParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentData = await parent;
  return {
    title: `关于 - ${parentData?.title?.absolute}`,
    description: '流年似水，石刻永恒',
  };
}

export default async function About() {
  const postData = await getFileData(postsDir, decodeURIComponent('流年似水，石刻永恒'));
  const { newCate, tags } = postData;
  // 解析Markdown
  const html = `
    <p class="time">发布时间：<time datetime="${postData.dateFriendly}">${postData.dateYMD}</time></p>
    <p class="words">${postData.wordcount}</p>
    ${postData.html}
  `;

  return (
    <>
      <div className={css.pageBody}>
        <Header menuItemList={menuItems} currentSelectedLabel= '关于' />
        <div className={css.pageBodyMain}>
          <Sidebar />
          <div className={`${css.articleContainer} scrollContent`}>
            <div className={`${css.articleBody} scrollContent`}>
              <h1 style={ {marginBottom: "0.1rem", marginTop: "0.2rem"}}>{postData.title}</h1>
              <div>
                {newCate && Tags({ label: "分类", tags: newCate, href: `/${Constants.postDir}/` })}
                {tags && Tags({ label: "标签", tags: tags })}
              </div>
              <article dangerouslySetInnerHTML={{ __html: html }} />
              <CopyBlock />
              <BottomBar />
            </div>
            <Toc />
          </div>
        </div>

        <BackTop />
      </div>
    </>
  );
}

