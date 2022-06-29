import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";

const postUsersSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }), //이메일 형식 'com','net'만 허용
    password: Joi.string().required().pattern(new RegExp("^[0-9a-z]{6,}$")), //최소 하나의 문자, 숫자 6글자 이상
    confirmpassword: Joi.string().required(),
    nickname: Joi.string().required()
});

//회원가입
const signup = async (req: Request, res: Response) => {
    const { email, nickname, password, confirmpassword } = req.body;
    await postUsersSchema.validateAsync(req.body);
    try {
        if (password !== confirmpassword) {
            res.status(400).json({
                errorMessage: "패스워드와 패스워드 확인란이 동일하지 않습니다."
            });
            return;
        }
        // 이메일 중복확인 버튼
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ errorMessage: "중복된 이메일이 존재합니다." });
        }
        // 닉네임 중복확인 버튼
        const existnicName = await User.findOne({ nickname });
        if (existnicName) {
            return res.status(400).json({ errorMessage: "중복된 닉네임이 존재합니다." });
        }
        await User.create({ email, nickname, password });
        return res.status(200).json({ msg: "success" });
    } catch (err) {
        res.json({ errorMessage: false });
        console.log(err);
    }
};
//로그인
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({
            email: email // 데이터베이스에 이메일이 존재하는지 확인
        });
        if (!user) {
            res.json({ result: false });
        }
        const check = await bcrypt.compare(password, user[0].password);
        if (!check) {
            res.json({ result: false });
            return;
        }
        //토큰 발급
        const token = jwt.sign({ email }, "main-secret-key");
        console.log(email);
        res.status(200).send({ msg: "success", token });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};
//로그인한 유저에 대한 정보 가져오기
const checkuser = async (req: Request, res: Response) => {
    const { user } = res.locals;
    res.send({ email: user.email, nickName: user.nickname });
};

export default { signup, login, checkuser };
