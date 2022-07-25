import { Types } from "mongoose";

export interface IStore {
    _id?: Types.ObjectId;
    title: string;
    //image: string;    
    //key: string;
    images: Array<string>;
    keys: Array<string>;
    address: string;
    review: string;
    userId: string;
    nickname: string;
    favorite_count: number;
}