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
        const existnicName = await User.findOne({ nickname });
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
        const token = jwt.sign({ user: user!._id }, "main-secret-key");
        await User.findByIdAndUpdate(user, { $set: { token } });
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

const withdrawal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = res.locals;
        await User.deleteOne({ user: user._id });
        res.json({ msg: "success" });
    } catch (err) {
        console.log(err);
    }
};

const kakaoCallback = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("kakao", { failureRedirect: "/" }, (err, user) => {
        if (err) return next(err);
        const { email, nickname } = user;
        const token = jwt.sign({ userId: user._id }, "main-secret-key");
        console.log(user);
        res.send({ email, nickname, token });
    })(req, res, next);
};

const googleCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "google",
      {
        successRedirect: "/",
        failureRedirect: "/login",
      },
      (err, profile, info) => {
        if (err) return next(err);
        const { email, nickname } = profile;
        const token = jwt.sign({ email }, "main-secret-key");
        console.log(profile);
        res.send({ token, email, nickname });
      }
    )(req, res, next);
  };

//로그아웃
const logout = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user._id;
        const user = await User.findByIdAndUpdate(userId, { token: "" });
        if (!user) {
            res.status(401).json({ message: "fail" });
            return;
        } else {
            res.json({ message: "success", user });
            return;
        }
    } catch (err) {
        console.log(err);
        res.json({ result: false });
    }
};

export default { signup, login, checkuser, kakaoCallback, googleCallback, withdrawal, logout };
