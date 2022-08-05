import mongoose, { Schema, Document } from "mongoose";
//import logging from '../config/logging';
import { IUser } from "../interfaces/user";

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        default: "b_tender"
    },
    password: {
        type: String
    },
    createdposts: {
        type: Number,
        default: 0
    },
    createdposts_store: {
        type: Number,
        default: 0
    },
    Drink_refrigerator: {
        type: Array
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
