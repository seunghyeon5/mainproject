import { Types } from "mongoose";

export interface IMyrecipe {
    _id?: Types.ObjectId;
    title: string;
    image: string;
    key: string;
    ingredients: Array<string>;
    brief_description: string;
    steps: Array<string>;
    userId: string;
    nickname: string;
    favorite_count: number;
    createdAt?: Date;
}
