'use client'
import css from './searchBar.module.css'
import searchIcon from '@/public/icons/search_gray.svg'
import Image from 'next/image'

export default function SearchBar({onSearchChanged}: {onSearchChanged: (value: string) => void}) {
    return (
        <div id='searchBar' className= {css.searchBar}>
            <input className={css.searchInput} type="text" placeholder="" onChange={(e) => {onSearchChanged(e.target.value)}} />
            <Image className={css.searchIcon} src={searchIcon} width={30} alt="搜索" />
        </div>
    )
}