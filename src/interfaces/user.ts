import { Types } from "mongoose";

export interface IUser {
    email: string;
    nickname: string;
    password: string;
    provider: string;
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    createdposts: number;
    createdposts_store: number;
    Drink_refrigerator: Array<string>;
}
