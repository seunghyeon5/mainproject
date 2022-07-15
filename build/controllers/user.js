"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config/config"));
//회원가입
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, nickname, password, confirmpassword } = req.body;
    try {
        if (password !== confirmpassword) {
            res.status(400).json({
                errorMessage: "1"
            });
            return;
        }
        // 이메일 중복확인 버튼
        const existEmail = yield user_1.default.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ errorMessage: "2" });
        }
        // 닉네임 중복확인 버튼
        const existnicName = yield user_1.default.findOne({ nickname: nickname });
        if (existnicName) {
            return res.status(400).json({ errorMessage: "3" });
        }
        password = bcrypt_1.default.hashSync(password, 10); //비밀번호 해싱
        yield user_1.default.create({ email, nickname, password });
        return res.status(200).json({ msg: "success" });
    }
    catch (err) {
        res.json({ errorMessage: false });
        console.log(err);
    }
});
//로그인
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email: email });
        console.log(user);
        if (!(user === null || user === void 0 ? void 0 : user.email)) {
            res.json({ result: false, msg: "1" });
            return;
        }
        const check = yield bcrypt_1.default.compare(password, user.password);
        if (!check) {
            res.json({ result: false, msg: "2" });
            return;
        }
        //토큰 발급
        // const token = jwt.sign({ user: user!._id, email: user.email, nickname: user.nickname }, config.jwt.secretKey as jwt.Secret, { expiresIn: "1d", algorithm: "RS256" });
        const token = jsonwebtoken_1.default.sign({ user: user._id }, config_1.default.jwt.secretKey, { expiresIn: "1d", algorithm: "HS256" });
        // console.log(jwt.decode(token, { complete: true }));
        res.status(200).send({ msg: "success", token, _id: user === null || user === void 0 ? void 0 : user._id, nickname: user === null || user === void 0 ? void 0 : user.nickname });
        return;
    }
    catch (err) {
        res.json({ result: false });
        console.log(err);
    }
});
//로그인한 유저에 대한 정보 가져오기
const checkuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    if (!user) {
        res.json({ result: false, msg: "1" });
        return;
    }
    res.send({ userId: user._id, email: user.email, nickName: user.nickname });
    return;
});
//회원탈퇴
const withdrawal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.userId;
        if (!userId) {
            return res.json({ result: false, msg: "1" });
        }
        yield user_1.default.findByIdAndDelete(userId);
        res.json({ msg: "success" });
        return;
    }
    catch (err) {
        console.log(err);
    }
});
//카카오 콜백
const kakaoCallback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("kakao", { failureRedirect: "/" }, (err, user) => {
        if (err)
            return next(err);
        const { email, nickname } = user;
        const token = jsonwebtoken_1.default.sign({ user: user._id }, config_1.default.jwt.secretKey, { expiresIn: "1d" });
        res.redirect(`http://www.b-tender.com/main/token=${token}&nickname=${nickname}&email=${email}`);
    })(req, res, next);
});
//구글 콜백
const googleCallback = (req, res, next) => {
    passport_1.default.authenticate("google", {
        failureRedirect: "/login"
    }, (err, user, info) => {
        if (err)
            return next(err);
        const { email, nickname } = user;
        const token = jsonwebtoken_1.default.sign({ user: user._id }, config_1.default.jwt.secretKey, { expiresIn: "1d" });
        //console.log(user);
        res.redirect(`https://www.b-tender.com/main/token=${token}&nickname=${nickname}&email=${email}`);
    })(req, res, next);
};
//닉네임 변경하기
const changeNickname = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname } = req.body;
    const { user } = res.locals;
    try {
        const existNickname = yield user_1.default.findOne({ nickname });
        if (existNickname) {
            res.json({ result: false, msg: "1" });
            return;
        }
        else {
            yield user_1.default.findOneAndUpdate({ _id: user._id }, { $set: { nickname: nickname } });
            return res.json({ result: true });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ result: false });
    }
});
//비밀번호 변경하기
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    let existPassword = req.body.password;
    let newPassword = req.body.newpassword;
    try {
        if (!user) {
            res.json({ result: false, msg: "1" });
            return;
        }
        const check = yield bcrypt_1.default.compare(existPassword, user.password);
        if (!check) {
            res.json({ result: false, msg: "2" });
            return;
        }
        else {
            newPassword = bcrypt_1.default.hashSync(newPassword, 10);
            yield user_1.default.findOneAndUpdate({ _id: user._id }, { $set: { password: newPassword } });
            res.json({ result: true });
            return;
        }
    }
    catch (err) {
        console.log(err);
        res.json({ result: false });
    }
});
const getmypage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    if (!user) {
        res.json({ result: false, msg: "1" });
    }
    res.send({ _id: user._id, nickname: user.nickname, email: user.email, createdposts: user.createdposts });
});
exports.default = { signup, login, checkuser, kakaoCallback, withdrawal, changeNickname, changePassword, googleCallback, getmypage };
