export interface Book {
    key: string;
    title: string;
    publish_date?: string;
    languages?:{
        key: string;
    }[];
    number_of_pages?:number;
    publisher?:string[];
    covers?: number[];
    works: {
        key: string;
    }[];
    authors?: {
    key: string;
    }[];

}