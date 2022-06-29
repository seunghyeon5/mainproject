import jwt from "jsonwebtoken";
import User from "../models/user";
import passportRouter from "passport";
import KakaoStrategy, { Strategy } from "passport-kakao";
import { env } from "../env";

const kakaoPassport = () => {
    passportRouter.serializeUser((user, done) => {
        done(null, user);
    });

    passportRouter.deserializeUser((user: any, done) => {
        done(null, user);
    });
};

export { kakaoPassport };
