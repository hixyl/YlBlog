'use client';
import Link from "next/link";
import css from "./category.module.css";
import { Constants } from "@/utils/Constants";

export default function Category({ categories, currentCategory }: { categories: string[], currentCategory: string }) {
  return (
    <div className={css.container}>
        <div className={css.box}>
          <Link
            className={`${css.item} ${currentCategory === "all" ? css.itemSelected : ""}`}
            href={`/${Constants.postDir}/all/1`}
            key={"all"}
          >
            全部
          </Link>
          {categories.map((category) => {
            return (
              <Link
                className={`${css.item} ${currentCategory === category ? css.itemSelected : ""}`}
                href={`/${Constants.postDir}/${category}/1`}
                key={category}
              >
                {category}
              </Link>
            );
          })}
        </div>
    </div>
  );
}
