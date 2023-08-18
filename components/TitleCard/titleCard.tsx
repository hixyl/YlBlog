'use client'
import Link from "next/link";
import Tags from "@/components/Tags/tags";
import css from "./titleCard.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
interface PagelinkProps {
    postsdir: string;
    id: string;
    title: string;
    description?: string;
    dateymd: string;
    dateFriendly?: string;
    categories: string[];
    tags?: string[] | null;
    images: string[];
    top?: boolean;
}

export default function TitleCard(props: PagelinkProps) {
    const { title, categories, tags, images } = props;
    let currentImg = 0;
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = event.target as HTMLImageElement;
        // target.src = "path/to/backup-image.jpg"; // 替换为备用图像的路径
        // target.alt = "Backup Image"; // 替换为备用图像的替代文本
        if (currentImg < images.length - 1) {
            currentImg = (currentImg + 1) % images.length
            target.src = images[currentImg];
        } else {
            target.remove();
        }
      };
    const [targetImgs, setTargetImgs] = useState<string[]>([]);
    useEffect(() => {
        let tImgs: string[] = [];
        images.forEach((img, index) => {
            if(img && !img.includes('/')) {
                tImgs.push(`/article/${props.id}/${img}`)
            } else {
                tImgs.push(img)
            }
        })
        if (tImgs.length > 0) {
            setTargetImgs(tImgs);
        }
    }, [images, props.id]);
    return (
        <Link key={props.id} href={`/article/${props.id}`}>
            <div className={css.titleCard}>
                <div className= {css.leftArea}>
                    {props.top && <div className={css.topLabel}>置顶</div>}
                    <p className={css.title}>{title}</p>
                    <div className={css.date}>
                        <span className={css.dateLabel}>发布时间</span>
                        {props.dateymd}
                    </div>
                    <div className={css.categoryAndTags}>
                        {categories && Tags({ label: "分类", tags: categories })}
                        {tags && Tags({ label: "标签", tags: tags })}
                    </div>
                </div>
                
                {images && images.length > 0 && targetImgs[currentImg] && <Image className={css.image} onError={handleImageError} src={targetImgs[currentImg]} id= {'image-' + props.id} alt={''} width={100} height={100} />}
            </div>
        </Link>
    );
}
