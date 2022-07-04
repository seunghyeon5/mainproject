import { Response, Request, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = String(req.headers.authorization);
    // console.log(authorization);
    const [tokentype, tokenvalue] = authorization.split(" ");
    if (tokenvalue == "null") {
        res.locals.users = null;
        next();
        return;
    }
    if (tokentype !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요 🙄"
        });
        return;
    }
    try {
        const user = jwt.verify(tokenvalue, "main-secret-key");
        // console.log(user);
        User.findById(Object.values(user)[0]).then((user) => {
            // console.log(user);
            res.locals.user = user;
            next();
        });
    } catch (err) {
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요"
        });
        console.log(err);
        return;
    }
};
