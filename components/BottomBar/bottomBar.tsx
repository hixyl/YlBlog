import css from './bottomBar.module.css'

export default function BottomBar() {
    return (
        <div className= {css.bottomBar}>
            <div className={css.text}>Powerd by 
                <a href='https://github.com/hixyl/YlBlog'>&nbsp;YlBlog(玉龙博客)</a>
            </div>
        </div>
    )
}