import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/user";

//회원가입
const signup = async (req: Request, res: Response) => {
    let { email, nickname, password, confirmpassword } = req.body;
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
        const existnicName = await User.findOne({ nickname: nickname });
        if (existnicName) {
            return res.status(400).json({ errorMessage: "중복된 닉네임이 존재합니다." });
        }
        password = bcrypt.hashSync(password, 10); //비밀번호 해싱
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
        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
            res.json({ result: false });
        }
        const check = await bcrypt.compare(password, user!.password);
        if (!check) {
            res.json({ result: false });
            return;
        }
        //토큰 발급
        const token = jwt.sign({ user: user!._id }, "main-secret-key", { expiresIn: "1d" });
        res.status(200).send({ msg: "success", token, user });
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
//회원탈퇴
const withdrawal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.user.userId;
        await User.findByIdAndDelete(userId);
        res.json({ msg: "success" });
    } catch (err) {
        console.log(err);
    }
};
//카카오 콜백
const kakaoCallback = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("kakao", { failureRedirect: "/" }, (err, user) => {
        if (err) return next(err);
        const { email, nickname } = user;
        const token = jwt.sign({ user: user._id }, "main-secret-key", { expiresIn: "1d" });
        console.log(user);
        res.send({ email, nickname, token });
    })(req, res, next);
};
//닉네임 변경하기
const changeNickname = async (req: Request, res: Response) => {
    const { nickname } = req.body;
    const { user } = res.locals;
    try {
        const existNickname = await User.findOne({ nickname });
        if (existNickname) {
            res.json({ result: false, msg: "이미 존재하는 닉네임 입니다." });
            return;
        } else {
            await User.findOneAndUpdate({ _id: user._id }, { $set: { nickname: nickname } });
            return res.json({ result: true });
        }
    } catch (err) {
        console.log(err);
        res.json({ result: false });
    }
};
//비밀번호 변경하기
const changePassword = async (req: Request, res: Response) => {
    const { user } = res.locals;
    let existPassword = req.body.password;
    let newPassword = req.body.newpassword;
    try {
        if (!user) {
            res.json({ result: false, msg: "존재하는 유저가 아닙니다." });
        }
        const check = await bcrypt.compare(existPassword, user!.password);
        if (!check) {
            res.json({ result: false, msg: "비밀번호가 올바르지 않습니다." });
            return;
        } else {
            newPassword = bcrypt.hashSync(newPassword, 10);
            await User.findOneAndUpdate({ _id: user._id }, { $set: { password: newPassword } });
            res.json({ result: true });
        }
    } catch (err) {
        console.log(err);
        res.json({ result: false });
    }
};
export default { signup, login, checkuser, kakaoCallback, withdrawal, changeNickname, changePassword };
