import css from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/header";
import { MenuItem } from "@/interfaces/MenuItem";
import { menuItems } from "@/config/menuItems";
import rightArray from "@/public/right_array.svg";
import Sidebar from "@/components/Sidebar/sidebar";
import topIcon from "@/public/top.svg";
import BackTop from "@/components/BackTop/backTop";
import indexImg from "@/public/imgs/index_pic.png";
import MovingLetters from "@/components/MovingLetters/movingLetters";
import { getAllMetaData, getTargetPageMetaDatas } from "@/utils/posts-md";
import { Constants } from "@/utils/Constants";
import Clock from "@/components/Clock/clock";
import BottomBar from "@/components/BottomBar/bottomBar";

export default async function Home() {
  const repeats = 10;
  const fileMetaData = await getAllMetaData(Constants.postDir, 5);
  const targePageMetaData = await getTargetPageMetaDatas(fileMetaData, 1, 5);

  return (
    // <main>
    <div>
      <Header menuItemList={menuItems} currentSelectedLabel="首页" />
      <div className={css.mainContainer}>
        {/* <Sidebar /> */}
        <div className={`scrollContainer ${css.wrapper}`}>
          {
            <div className={css.firstArea}>
              <div className={css.leftArea}>
                <div className= {css.poem}>
                  <Clock />
                </div>
                <Image className={css.indexImg} src={indexImg} alt="" />
              </div>
              <div className={css.rightArea}>
                <div>
                  <p className={css.mainText}>欢迎来到
                    <span style={{ fontSize: "2.2rem", marginLeft: "0.5rem" }}>流年石刻</span>
                  </p>
                  {/* <p className={css.secondText}>这里有很多有趣的东西</p> */}
                  <MovingLetters text={"闲云潭影日悠悠，物换星移几度秋"} />
                </div>
                <div className={css.keywords}>
                  <div className= {css.keyword}>思辨</div>
                  <div className= {css.keyword}>记录</div>
                  <div className= {css.keyword}>提高</div>
                </div>
                <div className={css.titleBox}>
                  <Link href={"/articles/all/1"}>
                    <div className={css.newArticleTag}>点我看本站的
                    <span style={{ fontSize: "1.5rem" }}>{fileMetaData.itemSize}</span>
                    篇文章</div>
                  </Link>
                  {
                    targePageMetaData.map((metaData, index) => {
                      return (
                        <Link key={metaData.attributes.id} href={"/article/" + metaData.attributes.id}>
                         <div className={css.articleTitle}> 
                          {metaData.attributes.title}
                        </div>
                        </Link>
                       
                      )
                    })
                  }
                </div>
                
              </div>
            </div>
          }
            <BottomBar />
        </div>
      </div>
      <BackTop />
      {/* {
        containerScrollIndex > 0 &&
        <Image className="top-icon" src={topIcon} alt="去顶部" width={30} onClick={scrollToTop}/>
      } */}
    </div>
    // </main>
  );
}
