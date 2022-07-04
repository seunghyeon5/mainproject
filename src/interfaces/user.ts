import { Types } from "mongoose";

export interface IUser {
    email: string;
    nickname: string;
    password: string;
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
}
