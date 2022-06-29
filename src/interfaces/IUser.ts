import mongoose from "mongoose";

export default interface IUser {
    _id?: mongoose.Types.ObjectId;
    email: string;
    nickname: string;
    password: string;
}
