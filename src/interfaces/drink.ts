import { Types } from "mongoose";

export interface IDrink {
    _id?: Types.ObjectId;
    title_kor: string;
    title_eng: string;
    short_description: string;
    flavour: string;
    alc: number;
    country: string;
    image: string;
    categoryId: string;
    recommend?: number;
    recommend_list: Array<string>;
}
