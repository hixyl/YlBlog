import hljs from "highlight.js";
import {load} from "cheerio";

export default function hightlightHtml(html: string) {
    const $ = load(html);
    // 遍历所有的code标签
    $('code').each(function () {
    // 获取code标签的文本内容
    const code = $(this).text();
    // // 获取code标签的class属性（如果有的话）
    // const lang = $(this).attr('class');
    // 高亮代码
    const highlightedCode = hljs.highlightAuto(code).value;
    // 替换原来的内容
    $(this).html(highlightedCode);
  });
  
  // 输出处理后的html字符串
  return $.html();
}