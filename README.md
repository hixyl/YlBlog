# 玉龙博客框架

本框架是类似hexo的前端框架，同时支持后端ssr技术，即服务端加载技术，示例页面: <https://www.timeshike.com>

## 功能介绍

1. 本博客支持静态部署，以及服务端动态渲染，基于`next.js`框架。
2. 已支持生成`sitemap`和rss订阅，做好了SEO优化。
3. 所有文章内容可以用`markdown`书写，支持配图和代码块复制。
4. 基于React，高度自定义，欢迎大家基于玉龙博客框架进行二次开发。

## 开始使用

### 项目的运行

将项目clone到本地之后，在项目目录运行

```bash
npm install
npm run dev
```

或

```bash
yarn install
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可进行开发

### 项目功能使用指南

所有的页面位于`app/`下，`app/`下的目录即为路由。

将文章的md文件放在`articles/`目录下即可，模板已经放置在项目中。如果有图片，请放在`public/article/[文章文件名(不含扩展名)]`, 具体使用方法可以参考项目中的示例。

网站的侧边栏位于 `components/Sidebar/`下，可以自定义。

导航栏配置项在`config/`目录下，可以参考模板自定义导航栏的图标，导航栏图标可以下载下来放到`public/`目录下即可。

### 项目的部署方法

运行 `npm run build` 即可输出静态文件，如果使用github pages，将`out/`文件夹内容上传到项目中即可完成静态部署。

## 了解更多

了解更多关于Next.js的内容:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

