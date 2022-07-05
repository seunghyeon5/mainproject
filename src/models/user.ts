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

UserSchema.pre("save", function (next) {
    const user = this;

    // user가 password를 바꿀때만 hashing 비밀번호 변경은 구현 못함 ㅠㅠ
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
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
