import { Types } from "mongoose";

export interface IDrink {
    _id?: Types.ObjectId;
    title_kor: string;
    title_eng: string;
    flavour: string;
    alc: number;
    country: string;
    image: string;
    categoryId: string;
}
