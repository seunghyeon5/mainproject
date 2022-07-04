import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const user_validation = {
    user_signUp: async (req: Request, res: Response, next: NextFunction) => {
        console.log("req :", req.body);
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
        } catch (e) {
            // 유효성 검사 에러
            console.log(e);
            return res.status(400).json({
                message: "유저정보작성이 잘못되었습니다! 확인해주세요!"
            });
        }
        next();
    }
};

export default user_validation;