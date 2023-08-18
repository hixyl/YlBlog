import { Constants } from "./Constants";
import { getAllMetaData } from "./posts-md"

export default async function getAllCategries() {
    const metaDatas = (await getAllMetaData(Constants.postDir)).metaData;
    let categories: string[] = [];
    let cateMap: {[key: string]: boolean} = {};
    metaDatas.forEach((metaData) => {
        const metaCate = metaData.value.attributes.categories;
        if (!metaCate) {
            return;
        }
        selectCategories(metaCate, categories, cateMap);
    })
    return categories;
}
function selectCategories(cate: string|string[]|string[][], categories: string[] = [], cateMap: {[key: string]: boolean} = {}) {
    if (typeof cate === 'string') {
        if (cateMap[cate]) {
            return;
        }
        categories.push(cate);
        cateMap[cate] = true;
    } else if(Array.isArray(cate)) {
        cate.forEach(
            (c) => selectCategories(c, categories, cateMap)
        )
    }
}