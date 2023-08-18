import { MenuItem, MenuItemMap } from "@/interfaces/MenuItem";

export const menuItems: MenuItem[] = [
    {
        id: 0,
        label: '首页',
        href: '/',
        icon: '/icons/home_gray.svg',
        iconSelected: '/icons/home_black.svg',
    },
    // {
    //     id: 1,
    //     label: '我的',
    //     href: '/mine',
    // },
    // {
    //     id: 2,
    //     label: '照片',
    //     href: '/photo',
    // },
    {
        id: 1,
        label: '文章',
        href: '/articles/all/1',
        icon: '/icons/article_gray.svg',
        iconSelected: '/icons/article_black.svg',
    },
    // {
    //     id: 2,
    //     label: '友链',
    //     href: '/link',
    //     icon: '/icons/link_gray.svg',
    //     iconSelected: '/icons/link_black.svg',
    // }, 
    {
        id: 3,
        label: '关于',
        href: '/about',
        icon: '/icons/about_gray.svg',
        iconSelected: '/icons/about_black.svg',
    },
    {
        id: 4,
        label: '搜索',
        href: '/search',
        icon: '/icons/search_gray.svg',
        iconSelected: '/icons/search_black.svg',
    }

]

// export const menuItemMap: MenuItemMap = {
//     '首页': menuItems[0],
//     '文章': menuItems[1],
//     '友链': menuItems[2],
//     '关于': menuItems[3],
// }