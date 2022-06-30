import { Response, Request, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

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
            errorMessage: "로그인 후 사용하세요 🙄"
        });
        return;
    }
    try {
        const email: Object = jwt.verify(tokenvalue, "main-secret-key");
        //이메일 array안에 email이라는 오브젝트를 꺼내와서 verify를 진행
        User.findOne({ email: Object.values(email)[0] }).then((user) => {
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
