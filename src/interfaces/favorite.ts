import { Types } from "mongoose";

export interface IFavorite {
    _id?: Types.ObjectId;
    nickname: string;
    myfavoritesId: string; 
    userId:string; 
    category:string;
    myfavoritesInfo:object;   
}
