import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const user_validation = {
    user_signUp: async (req: Request, res: Response, next: NextFunction) => {
        // console.log("req :", req.body);
        const body = req.body;
        const postUsersSchema = Joi.object({
            email: Joi.string()
                .required()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }), //이메일 형식 'com','net'만 허용
            password: Joi.string().required().pattern(new RegExp("^[0-9a-z]{6,}$")), //최소 6자 이상
            confirmpassword: Joi.string().required(),
            nickname: Joi.string().required()
        });

        try {
            // 검사시작
            await postUsersSchema.validateAsync(body);
        } catch (err) {
            // 유효성 검사 에러
            console.log(err);
            return res.status(400).json({
                result: false
            });
        }
        next();
    },

    user_changenickname: async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        const changeUserSchema = Joi.object({
            nickname: Joi.string().required()
        });

        try {
            await changeUserSchema.validateAsync(body);
        } catch (err) {
            console.log(err);
            return res.json({ result: false });
        }
        next();
    },

    user_changepassword: async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        const ChangeUserSchema = Joi.object({
            password: Joi.string().required().pattern(new RegExp("^[0-9a-z]{6,}$")),
            newpassword: Joi.string().required().pattern(new RegExp("^[0-9a-z]{6,}$")) //최소 6자 이상
        });

        try {
            await ChangeUserSchema.validateAsync(body);
        } catch (err) {
            console.log(err);
            return res.json({ result: false });
        }
        next();
    }
};

export default user_validation;
