import { Types } from "mongoose";

export interface IFavorite {
    _id?: Types.ObjectId;
    nickname: string;
    myrecipeId: string;
    MystoreId:string;
    category:string;
    Myrecipe:Array<string>;
    Store:Array<string>;
    userId:string;
}
