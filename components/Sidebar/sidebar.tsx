"use client";
import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.css"; // 创建对应的CSS模块文件来设置样式
import Image from "next/image";
import rightArray from "@/public/right_array.svg";
import leftArray from "@/public/left_array.svg";
import TopImgBox from "@/components/TopImgBox/topImgBox";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    //   console.log(windowWidth);
    if (window.innerWidth < 740) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
    const handleResize = () => {
      if (window.innerWidth < 740) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // 添加窗口大小变化事件监听器
    window.addEventListener("resize", handleResize);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className= {styles.sidebarInner}>
          <TopImgBox />
        </div>
        <div className={styles.btnArea}>
          <div className={styles.btnRect} onClick={toggleSidebar}>
            <Image
              className={styles.imgBtn}
              src={isSidebarOpen ? leftArray : rightArray}
              alt="rightArray"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
