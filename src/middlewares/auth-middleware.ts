import { Response, Request, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = String(req.headers.authorization);
    const [tokentype, tokenvalue] = authorization.split(" ");
    if (tokenvalue == "null") {
        res.locals.users = null;
        next();
        return;
    }
    if (tokentype !== "Bearer") {
        res.status(401).send({
            message: "토큰값 에러"
        });
        return;
    }
    try {
        const user: jwt.JwtPayload | string = jwt.verify(tokenvalue, config.jwt.secretKey as jwt.Secret);
        User.findById((user as jwt.JwtPayload).user).then((user) => {
            res.locals = { user };
            return next();
        });
    } catch (err) {
        res.status(401).send({
            message: "로그인 후 사용하세요"
        });
        console.log(err);
        return;
    }
};

export default authMiddleware;
