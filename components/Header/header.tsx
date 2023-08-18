"use client";
import Link from "next/link";
import { MenuItem, MenuProps } from "@/interfaces/MenuItem";
import Menu from "@/components/Menu/menu";
// import './header.css'
import css from "./header.module.css";
import MenuIcon from "@/public/menu.svg";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu/mobileMenu";
import { useEffect, useState } from "react";
import searchIcon from "@/public/icons/search_gray.svg";

export default function Header(menuProps: MenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileStatus, setIsMobileStatus] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 740) {
      setIsMobileStatus(true);
    }
    const handleResize = () => {
      if (window.innerWidth > 740) {
        setIsMobileMenuOpen(false);
        setIsMobileStatus(false);
      } else {
        setIsMobileStatus(true);
      }
    };

    // 添加窗口大小变化事件监听器
    window.addEventListener("resize", handleResize);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={css.header}>
      <div className={css.topHeader}>
        <Link href={"/"}>
          <div className={css.logo}>流年石刻</div>
        </Link>
        <Menu
          menuItemList={menuProps.menuItemList}
          currentSelectedLabel={menuProps.currentSelectedLabel}
        />
        <div className= {css.iconArea}>
          {isMobileStatus && (
            <Link href={"/search"}>
              <Image className={css.menuIcon} src={searchIcon} width={30} alt="搜索" />
            </Link>
          )}
          <Image
            className={css.menuIcon}
            src={MenuIcon}
            width={30}
            alt="menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
        
      </div>
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        menuItemList={menuProps.menuItemList}
        currentSelectedLabel={menuProps.currentSelectedLabel}
      />
    </div>
  );
}
