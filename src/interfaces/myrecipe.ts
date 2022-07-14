import { Types } from "mongoose";

export interface IMyrecipe {
    _id?: Types.ObjectId;
    title: string;
    image: string;
    key: string;
    ingredients: Array<string>;
    brief_description: string;
    userId: string;
    nickname: string;
}
