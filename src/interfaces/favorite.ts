import { Types } from "mongoose";

export interface IFavorite {
    _id?: Types.ObjectId;
    nickname: string;
    myrecipeId: string;
    MystoreId:string;
    drinkId:string;
    category:string;
}
