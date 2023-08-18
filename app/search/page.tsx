'use client';
import Header from "@/components/Header/header";
import { menuItems } from "@/config/menuItems";
import { getAllMetaData, getFileData, getFileIds } from "@/utils/posts-md";
import css from "./search.module.css";
import BackTop from "@/components/BackTop/backTop";
import Head from "next/head";
import { Metadata, ResolvingMetadata } from "next";
import Toc from "@/components/Toc/toc";
import Sidebar from "@/components/Sidebar/sidebar";
import { Constants } from "@/utils/Constants";
import CopyBlock from "@/components/CopyBlock/copyBlock";
import Tags from "@/components/Tags/tags";
import TitleCard from "@/components/TitleCard/titleCard";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar/searchBar";
import MovingLetters from "@/components/MovingLetters/movingLetters";
import BottomBar from "@/components/BottomBar/bottomBar";

const postsDir = Constants.postDir;
dayjs.extend(utc);

interface DataItem {
  id: string;
  title: string;
  date: string;
  categories?: string[] | null;
  tags?: string[] | null;
  images?: string[];
}

export default function Search() {
 
  const getJson =async () => {
    try {
      const response = await fetch('/search.json');
      const json = await response.json();
      setFullData(json);
    } catch(e) {
      console.error(e);
    }
  };
  const onSearchChanged = (value: string) => {
    if (!fullData) {
      return;
    }
    if (!value) {
      setSearchResult([])
      return;
    }
    let searchTempArr: DataItem[] = [];
    fullData.forEach((item) => {
      if (item.title.includes(value)) {
        searchTempArr.push(item);
      }
    })
    searchTempArr.sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date))) ? 1 : -1)
    setSearchResult(searchTempArr);

  };
  const [searchResult, setSearchResult] = useState<DataItem[]>([]);
  const [fullData, setFullData] = useState<DataItem[]>([]);
  useEffect(() => {
    
    getJson();
  });
  return (
    <div className={css.pageBody}>
      <title>搜索-流年石刻</title>
      <Header menuItemList={menuItems} currentSelectedLabel= '搜索' />
      <div className={css.pageBodyMain}>
        <Sidebar />
        <div className={`${css.bodyContanier} scrollContent`}>
            <SearchBar onSearchChanged={onSearchChanged}/>
            <div className={css.pageList}>
              {searchResult &&
                searchResult.map((metaData) => {
                  const dateymd = dayjs(metaData.date).utc().format('YYYY-MM-DD HH:mm:ss');
                  return (
                    <TitleCard
                      key={metaData.id}
                      postsdir={postsDir}
                      id={metaData.id}
                      title={metaData.title}
                      dateymd={dateymd}
                      categories={metaData.categories || []}
                      tags={metaData.tags}
                      images={metaData.images || []}
                    />
                )})}
            </div>
            {
              searchResult.length === 0 &&
              <div className= {css.noResult}>
                <MovingLetters text="请输入任意关键词，搜索所有文章" />
              </div>
            }
            
        </div>
        <div style={{position: "absolute", bottom: '1.8rem', left: '50%', transform: 'translateX(-50%)'}}>
          <BottomBar/>
        </div>
      </div>
      <BackTop />
    </div>
  );
}

