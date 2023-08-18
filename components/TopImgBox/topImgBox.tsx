import css from './topImgBox.module.css';
import topImg from '@/public/imgs/author.jpg';
import Image from 'next/image';
import emailGray from '@/public/email_gray.svg';
import emailBlack from '@/public/email_black.svg';
import rssIcon from '@/public/icons/rss.svg';

export default function TopImgBox() {
    return (
        <div className={css.topImgBox}>
            <Image className={css.topImg} src={topImg} alt="" />
            <div className={css.textArea}>
                <div className={css.author }>星玉龙</div>
                <div className={css.position }>前端工程师</div>
                <a className={css.email } href='mailto:me@timeshike.com'>me@timeshike.com</a>
                <a className= {css.githubBtn} href='https://github.com/hixyl'>Github</a>
                <div className= {css.content}>闲云潭影，物换星移<br/>
                    滕王高阁，几度春秋<br/>
                    故人不在，长江空流<br/>
                    月圆复缺，岁月悠悠<br/>
                </div>
                <div className= {css.bottomBtns}>
                    <a href='/atom.xml' >
                        <Image className= {css.rssBtn} src={rssIcon} width={20} height={20} alt='rss' />
                    </a>
                </div>
            </div>
        </div>
    )
}