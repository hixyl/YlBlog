"use client";
import { useState } from "react";
import css from "./mobileMenu.module.css";
import { MenuItem } from "@/interfaces/MenuItem";
import Link from "next/link";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  menuItemList: MenuItem[];
  currentSelectedLabel: string;
}
export default function MobileMenu(mobileMenuProps: MobileMenuProps) {
  const { isMobileMenuOpen, menuItemList, currentSelectedLabel } = mobileMenuProps;
  return (
    <div
      className={`${css.mobileMenu} ${css.menuContainer} ${isMobileMenuOpen ? css.open : ""
        }`}
    >
      {menuItemList.map((item) => (
        <Link key={item.id} href={item.href}>
          <div
            style={
              {
                "--icon-unSelected": `url(${item.icon || ""})`,
                "--icon-selected": `url(${item.iconSelected || ""})`,
              } as React.CSSProperties
            }
            className={`${css.item} ${item.label === currentSelectedLabel ? css.itemSelected : ""}`}
          >
            {item.label}
          </div>
        </Link>
      ))}
    </div>
  );
}
