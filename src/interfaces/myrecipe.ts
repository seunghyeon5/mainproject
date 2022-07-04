import { Types } from "mongoose";

export interface IMyrecipe {
    _id?: Types.ObjectId;
    title: string;
    image: string;
    ingredients: Array<string>;
    brief_description: string;
    myrecipeId: Types.ObjectId;
}
