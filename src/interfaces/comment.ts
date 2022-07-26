import { Types } from "mongoose";

export interface IComment {
    _id?: Types.ObjectId;
    nickname: string;
    mystoreId:string;
    comment:string;
    userId:string;
}
