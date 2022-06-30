import mongoose from "mongoose";

export interface IUser {
    email: string;
    nickname: string;
    password: string;
    _id?: mongoose.Types.ObjectId; //?는 있어도되고 없어도되게끔하는 옵션설정
}
