'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import topIcon from "@/public/top.svg";
import css from './backTop.module.css';

export default function BackTop() {
    const scrollToTop = () => {
        if (element) {
            element.scrollTo({
            top: 0,
            behavior: 'smooth', // Optionally, add smooth scrolling effect
          });
        }
      };
      const [element, setElement] = useState<Element|null>();
      
      const [containerScrollIndex, setContainerScrollIndex] = useState(0);
      useEffect(() => {
        // 监听滚动事件
        const element = document.querySelector('.scrollContent')
        setElement(element);
        element?.addEventListener('scroll', () => {
        // targetRef?.current?.addEventListener('scroll', () => {
          setContainerScrollIndex(element.scrollTop || 0);
        })
      }, []);
      return (
        <>
            {
                containerScrollIndex > 0 &&
                <Image  className={css.topIcon} src={topIcon} alt="去顶部" width={30} onClick={scrollToTop}/>
            }
        </>
      )
}