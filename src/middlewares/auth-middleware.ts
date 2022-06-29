import { Response, Request, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = String(req.headers);
    const [tokenType, tokenValue] = authorization.split(" ");
    if (tokenValue == "null") {
        res.locals.users = null;
        next();
        return;
    }

    if (tokenType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요 🙄"
        });
        return;
    }
    try {
        const user = jwt.verify(tokenValue, "main-secret-key");
        // console.log(userId);
        //decoded가 제대로된 값

        User.findById(user).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (error) {
        //제대로 안된 값
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요"
        });
        return;
    }
};
