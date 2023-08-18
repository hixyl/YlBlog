"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import css from "./toc.module.css";
import "./toc.css";
import Image from "next/image";
import tocIcon from "@/public/toc.svg";
import { random } from "../MovingLetters/anime.min";

interface TocItem {
  level: number;
  preNum?: string;
  title: string;
  element: HTMLElement;
  children: TocItem[];
}

const NestedList = ({
  data,
  setIsTocOpen,
}: {
  data: TocItem[];
  setIsTocOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <ul>
      {data.map((item) => (
        <li key={item.title}>
          <span
            className={`${css.tocTitle}
                ${item.level === 1 && css.mainTitle}`}
            onClick={() => {
              const htmlElement = item.element;
              const scrollContent = document.querySelector(".scrollContent");
              scrollContent?.scrollTo({
                top: htmlElement.offsetTop - 180,
                behavior: "smooth",
              });
              if (window.innerWidth < 1073) {
                setTimeout(() => {
                  setIsTocOpen(false);
                }, 300);
              }
            }}
          >
            {item.preNum} {item.title}
          </span>
          {item.children.length > 0 && (
            <NestedList data={item.children} setIsTocOpen={setIsTocOpen} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default function Toc() {
  /**
   * 生成前缀
   */
  const genPreNum = (
    tocItems: TocItem[],
    zIndex: number,
    parentPre: string
  ) => {
    if (zIndex === 0) {
      tocItems.forEach((item) => {
        genPreNum(item.children, zIndex + 1, "");
      });
      return;
    } else {
      tocItems.forEach((item, index) => {
        // 判断标题是否以中文数字或数字加点开头
        const chineseNumberPattern = /^(一|二|三|四|五|六|七|八|九|十)+、/;
        const arabicNumberPattern = /^[0-9]+\./;

        if (
          !(
            chineseNumberPattern.test(item.title) ||
            arabicNumberPattern.test(item.title)
          )
        ) {
          item.preNum = parentPre + (index + 1) + ".";
        } else {
          item.preNum = "";
        }
        genPreNum(item.children, zIndex + 1, item.preNum);
      });
    }
  };
  /**
   * 将 item 插入到父级
   * @param item
   * @param parent
   * @returns
   */
  const insertToParentLevel = (item: TocItem, parent: TocItem) => {
    if (parent.children.length > 0) {
      for (let i = parent.children.length - 1; i >= 0; i--) {
        if (item.level <= parent.children[i].level) {
          parent.children.push(item);
          return;
        } else {
          insertToParentLevel(item, parent.children[i]);
          return;
        }
      }
      insertToParentLevel(item, parent.children[parent.children.length - 1]);
    } else {
      parent.children.push(item);
    }
  };

  const getTocs = () => {
    const headings = document.querySelectorAll(
      "article h1, article h2, article h3, article h4, article h5, article h6"
    );
    if (!headings) {
      return;
    }
    let tocItems: TocItem[] = [];
    let currentTopLevel = 0;
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i] as HTMLElement;
      const currentLevel = Number(heading.tagName[1]);
      const tocItem: TocItem = {
        level: Number(heading.tagName[1]),
        title: heading.textContent || "",
        element: heading,
        children: [],
      };
      if (i == 0) {
        tocItems.push(tocItem);
        currentTopLevel = currentLevel;
      } else if (currentLevel <= currentTopLevel) {
        // 当前级别大于等于上面所有的级(数字越小，级别越高)
        tocItems.push(tocItem);
      } else if (currentLevel > currentTopLevel) {
        // 当前级别小于上面所有的级
        insertToParentLevel(tocItem, tocItems[tocItems.length - 1]);
      }
    }
    genPreNum(tocItems, 1, "");
    return tocItems;
  };

  useEffect(() => {
    setTocItems(getTocs());
    if (window.innerWidth < 1073) {
      setIsTocOpen(false);
    } 
    else {
      setIsTocOpen(true);
    }
    const handleResize = () => {
      if (window.innerWidth < 1073) {
        setIsTocOpen(false);
      } else {
        setIsTocOpen(true);
      }
    };
    // 解决文章中的部分图片无法加载的bug
    document.querySelectorAll('article img').forEach((img) => {
      console.log(img)
      img.addEventListener("error", (event: Event) => {
        const target = event.target as HTMLImageElement;
        if (target.id.startsWith('handler_img')) {
          return;
        }
        setTimeout(() => {
          target.src = target.src;
        }, 300);
        setTimeout(() => {
          target.src = target.src;
        }, 2000);
        target.src = target.src;
        target.id = 'handler_img' + random(1, 1000000);
      });
    });

    // 添加窗口大小变化事件监听器
    window.addEventListener("resize", handleResize);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };

    
  }, []);
  const [tocItems, setTocItems] = useState<TocItem[]>();
  const [isTocOpen, setIsTocOpen] = useState(true);
  const onBtnClick = () => {
    if (!isTocOpen) {
      setTimeout(() => {
        document.querySelector(".scrollContent")?.scrollTo({
          left: document.body.clientWidth,
          behavior: "smooth",
        });
      }, 300);
    }
    setIsTocOpen(!isTocOpen);
  };
  return (
    tocItems && tocItems.length > 0 &&
    <div className={`${css.toc} ${isTocOpen ? css.open : ""}`}>
      <div className={css.tocInner}>
        {tocItems && NestedList({ data: tocItems, setIsTocOpen })}
      </div>
      <div className={css.button} onClick={onBtnClick}>
        <Image src={tocIcon} alt="" width={25} />
        {isTocOpen && <span>折叠&nbsp;</span>}
      </div>
    </div>
  );
}
