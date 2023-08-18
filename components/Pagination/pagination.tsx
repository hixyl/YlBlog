'use client';
import Link from "next/link";
import css from "./pagination.module.css";
import { useEffect, useState } from "react";

const href = "/articles/";

export default function Pagination(props: {
    pages: number;
    currentPage: number;
    category: string;
}) {
    const hrefDir = href + props.category + "/";
    const { pages, currentPage, category } = props;

    const [paginationNums, setPaginationNums] = useState(4);
    const adjustPaginationNums = () => {
        // 根据屏幕宽度决定显示几个页码
        if (window.innerWidth < 480) {
            setPaginationNums(3);
        }
        else if (window.innerWidth < 740) {
            setPaginationNums(4);
        } else if (window.innerWidth < 1024) {
            setPaginationNums(6);
        } else if (window.innerWidth < 1280) {
            setPaginationNums(8);
        } else {
            setPaginationNums(10);
        }
    }
    useEffect(() => {
        adjustPaginationNums();
        // 监听屏幕宽度变化
        window.addEventListener("resize", () => {
            adjustPaginationNums();
        })
        
    }, []);


    let displayedPages = pages <= paginationNums ? pages : paginationNums;
    let startPage = Math.max(1, currentPage - Math.floor(displayedPages / 2));
    let endPage = Math.min(pages, startPage + displayedPages - 1);
    if (endPage - startPage < displayedPages - 1) {
        startPage = Math.max(1, endPage - displayedPages + 1);
    }

    const pageLinks = [];

    if (startPage > 1) {
        pageLinks.push(
            <Link key={1} href={hrefDir + 1}>
                1
            </Link>
        );
        if (startPage > 2) {
            pageLinks.push(
                <span key="start-ellipsis" className={css.ellipsis}>
                    ...
                </span>
            );
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageLinks.push(
            <Link key={i} href={hrefDir + i} className= {i === currentPage ? css.currentPagination : ""}>
                {i}
            </Link>
        );
    }

    if (endPage < pages) {
        if (endPage < pages - 1) {
            pageLinks.push(
                <span key="end-ellipsis" className={css.ellipsis}>
                    ...
                </span>
            );
        }
        pageLinks.push(
            <Link key={pages} href={hrefDir + pages}>
                {pages}
            </Link>
        );
    }


    return (
        <div className={css.pagination}>
            {currentPage > 1 && (
                <Link href={hrefDir + (currentPage - 1)}>上一页</Link>
            )}

            {pageLinks}

            {currentPage < pages && (
                <Link href={hrefDir + (currentPage + 1)}>下一页</Link>
            )}
        </div>
    );
}