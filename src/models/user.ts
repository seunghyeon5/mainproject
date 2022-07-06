import mongoose, { Schema, Document } from "mongoose";
//import logging from '../config/logging';
import { IUser } from "../interfaces/user";
import bcrypt from "bcrypt";

const saltRounds = 8;

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true
    },
    nickname: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

UserSchema.virtual("userId").get(function () {
    return this._id.toHexString();
});
UserSchema.set("toJSON", {
    virtuals: true
});

UserSchema.post<IUser>("save", function () {
    //logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

export default mongoose.model<IUser & Document>("User", UserSchema);
