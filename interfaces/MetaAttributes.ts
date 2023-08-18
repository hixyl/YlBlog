interface MetaAttributes {
    id: string;
    date: Date;
    dateYMD: string;
    dateFriendly: string;
    wordcount: string;
    title: string;
    description: string;
    categories?: string[] | string[][];
    newCate: string[];
    tags?: string[];
    top?: boolean;
}