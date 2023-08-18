import { promises as fsp } from "fs";
import { getAllMetaData } from "./posts-md";

export async function generateArticleListJson(dir: string, outputFilePath: string) {
    try {
        const metaData = await getAllMetaData(dir);

        // Extract only the necessary fields for the article list
        const metaDataFiltered = metaData.metaData;
        const articles = metaDataFiltered.map((md) => ({
            id: md.value.attributes.id,
            title: md.value.attributes.title,
            date: md.value.attributes.date,
            categories: md.value.attributes.newCate,
            images: md.value.images,
            tags: md.value.attributes.tags
        }));
        

        // Write the article list to a JSON file
        await fsp.writeFile(outputFilePath + 'search.json', JSON.stringify(articles, null, 2), "utf-8");

        console.log("Article list JSON file generated successfully!");
    } catch (error) {
        console.error("Error generating article list:", error);
    }
}