import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/user";
import config from "../config/config";

//회원가입
const signup = async (req: Request, res: Response) => {
    let { email, nickname, password, confirmpassword } = req.body;
    try {
        if (password !== confirmpassword) {
            res.status(400).json({
                errorMessage: "1"
            });
            return;
        }
        // 이메일 중복확인 버튼
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ errorMessage: "2" });
        }
        // 닉네임 중복확인 버튼
        const existnicName = await User.findOne({ nickname: nickname });
        if (existnicName) {
            return res.status(400).json({ errorMessage: "3" });
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
        if (!user?.email) {
            res.json({ result: false, msg: "1" });
            return;
        }
        const check = await bcrypt.compare(password, user!.password);
        if (!check) {
            res.json({ result: false, msg: "2" });
            return;
        }
        //토큰 발급
        // const token = jwt.sign({ user: user!._id, email: user.email, nickname: user.nickname }, config.jwt.secretKey as jwt.Secret, { expiresIn: "1d", algorithm: "RS256" });
        const token = jwt.sign({ user: user!._id }, config.jwt.secretKey as jwt.Secret, { expiresIn: "1d", algorithm: "HS256" });
        // console.log(jwt.decode(token, { complete: true }));
        res.status(200).send({ msg: "success", token, _id: user?._id, nickname: user?.nickname });
        return;
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};

//로그인한 유저에 대한 정보 가져오기
const checkuser = async (req: Request, res: Response) => {
    const { user } = res.locals;
    if (!user) {
        res.json({ result: false, msg: "1" });
        return;
    }
    res.send({ email: user.email, nickName: user.nickname });
    return;
};

//회원탈퇴
const withdrawal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.user.userId;
        if (!userId) {
            return res.json({ result: false, msg: "1" });
        }
        await User.findByIdAndDelete(userId);
        res.json({ msg: "success" });
        return;
    } catch (err) {
        console.log(err);
    }
};

//카카오 콜백
const kakaoCallback = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("kakao", { failureRedirect: "/" }, (err, user) => {
        if (err) return next(err);
        const { email, nickname } = user;
        const token = jwt.sign({ user: user._id }, config.jwt.secretKey as jwt.Secret, { expiresIn: "1d" });
        console.log(user);

        res.redirect(`https://www.hel-ping.com`);
        // res.redirect(`http://localhost:8080/api/user/kakao/callback/token=${token}`);
    })(req, res, next);
};

//구글 콜백
const googleCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        "google",
        {
            successRedirect: "/",
            failureRedirect: "/login"
        },
        (err, user, info) => {
            if (err) return next(err);
            const { email, nickname } = user;
            const token = jwt.sign({ user: user._id }, config.jwt.secretKey as jwt.Secret, { expiresIn: "1d" });
            console.log(user);
            res.redirect(`http://localhost:3000/api/user/google/callback/token=${token}&nickname=${nickname}&email=${email}`);
        }
    )(req, res, next);
};

//닉네임 변경하기
const changeNickname = async (req: Request, res: Response) => {
    const { nickname } = req.body;
    const { user } = res.locals;
    try {
        const existNickname = await User.findOne({ nickname });
        if (existNickname) {
            res.json({ result: false, msg: "1" });
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
            res.json({ result: false, msg: "1" });
            return;
        }
        const check = await bcrypt.compare(existPassword, user!.password);
        if (!check) {
            res.json({ result: false, msg: "2" });
            return;
        } else {
            newPassword = bcrypt.hashSync(newPassword, 10);
            await User.findOneAndUpdate({ _id: user._id }, { $set: { password: newPassword } });
            res.json({ result: true });
            return;
        }
    } catch (err) {
        console.log(err);
        res.json({ result: false });
    }
};

const getmypage = async (req: Request, res: Response) => {
    const user = res.locals.user;
    if (!user) {
        res.json({ result: false, msg: "1" });
    }
    res.send({ _id: user._id, nickname: user.nickname, email: user.email, createdposts: user.createdposts });
};

export default { signup, login, checkuser, kakaoCallback, withdrawal, changeNickname, changePassword, googleCallback, getmypage };
