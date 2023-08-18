import RSS from "rss";
import fs from 'fs';

export default async function generateRssFeed(fileMetaData: {
  metaData: {
    value: {
      images: string[];
      newCate: string[];
      attributes: MetaAttributes;
      body: string;
      bodyBegin: number;
      frontmatter?: string | undefined;
    };
    status: "fulfilled";
  }[];
  pages: number;
  category: string | undefined;
  itemSize: number;
}) {
  const site_url = "https://www.timeshike.com";

  const feedOptions = {
    title: "流年石刻",
    description: "流年似水，石刻永恒",
    site_url: site_url,
    feed_url: `${site_url}/atom.xml`,
    image_url: `${site_url}/favicon.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
  };

  const feed = new RSS(feedOptions);
  fileMetaData.metaData.map((item) => {
      feed.item(
        {
          title: item.value.attributes.title,
          description: item.value.attributes.description,
          url: `${site_url}/article/${item.value.attributes.id}`,
          date: item.value.attributes.date
        }
      )
  })
  fs.writeFileSync('./public/atom.xml', feed.xml({ indent: true }));
}
