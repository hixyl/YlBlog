// import './menu.css'
import css from "./menu.module.css";
import { MenuProps } from "@/interfaces/MenuItem";
import Link from "next/link";

export default function Menu(menuProps: MenuProps) {
  const { menuItemList, currentSelectedLabel } = menuProps;
  return (
    <div className={css.menuBox}>
      {menuItemList.map((item) => (
        <Link key={item.id} href={item.href}>
          <p
            style={
              {
                "--icon-unSelected": `url(${item.icon || ""})`,
                "--icon-selected": `url(${item.iconSelected || ""})`,
              } as React.CSSProperties
            }
            className={
              item.label === currentSelectedLabel
                ? css.navListItemSelected
                : css.navListItem
            }
          >
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
}
