/**
 * Extract image links from HTML
 * @param html 
 * @returns 
 */
export function extractImageUrlsFromHTML(html: string): string[] {
    const imgTagRegex = /<img[^>]+src="([^"]+)"/g;
    const matches = html.match(imgTagRegex);
    
    if (!matches) {
        return [];
    }
    
    const imgUrls = matches.map(match => {
        const srcMatch = /src="([^"]+)"/.exec(match);
        if (srcMatch && srcMatch[1]) {
            return srcMatch[1];
        }
        return '';
    });
    
    return imgUrls;
}

/**
 * Extract image links from markdown
 * @param markdown 
 * @returns 
 */
export function extractImageLinksFromMarkdown(markdown: string): string[] {
    const imageLinkRegex = /!\[.*?\]\((.*?)\)/g;
    const matches = markdown.match(imageLinkRegex);

    if (!matches) {
        return [];
    }

    const imageLinks = matches.map(match => {
        const srcMatch = /\((.*?)\)/.exec(match);
        if (srcMatch && srcMatch[1]) {
            return srcMatch[1];
        }
        return '';
    });
    return imageLinks;
}
