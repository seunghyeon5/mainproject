import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/user";
import config from "../config/config";
import HttpStatusCode from "../common/httpStatusCode";
import myrecipe from "../models/myrecipe"
import comment from "../models/comment"
import store from "../models/store";
import favorite from "../models/favorite";

//회원가입
const signup = async (req: Request, res: Response) => {
  let { email, nickname, password, confirmpassword } = req.body;

  try {
    if (password !== confirmpassword) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        result: false,
        message: "비밀번호 불일치",
      });
    }
    // 이메일 중복확인 버튼
    const existEmail = await User.findOne({$and:[{email: email},{provider:"b_tender"}]});
    if (existEmail) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ result: false, message: "중복된 이메일" });
    }
    // 닉네임 중복확인 버튼
    const existnicName = await User.findOne({ nickname });
    if (existnicName) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ result: false, message: "중복된 닉네임" });
    }
    password = bcrypt.hashSync(password, 10); //비밀번호 해싱
    await User.create({ email, nickname, password });
    return res.json({ result: true, message: "success" });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ result: false, message: "잘못된 요청", error });
  }
};

//로그인
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({$and:[{email: email},{provider:"b_tender"}]});

    if (!user?.email) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ result: false, message: "이메일 없음" });
    }
    const check = await bcrypt.compare(password, user!.password);
    if (!check) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ result: false, message: "비밀번호 불일치" });
    }
    //토큰 발급
    // const token = jwt.sign({ user: user!._id, email: user.email, nickname: user.nickname }, config.jwt.secretKey as jwt.Secret, { expiresIn: "1d", algorithm: "RS256" });
    const token = jwt.sign(
      { user: user!._id },
      config.jwt.secretKey as jwt.Secret,
      { expiresIn: "1d", algorithm: "HS256" }
    );
    // console.log(jwt.decode(token, { complete: true }));
    return res.json({
      result: true,
      message: "success",
      token,
      _id: user?._id,
      nickname: user?.nickname,
    });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ result: false, message: "잘못된 요청", error });
  }
};

//로그인한 유저에 대한 정보 가져오기
const checkuser = async (req: Request, res: Response) => {
  const { user } = res.locals;
  if (!user) {
    return res
      .status(HttpStatusCode.NOT_FOUND)
      .json({ result: false, message: "존재하지 않음" });
  }
  return res.json({
    result: true,
    message: "success",
    userId: user._id,
    nickName: user.nickname,
  });
};

//회원탈퇴
const withdrawal = async (req: Request, res: Response) => {
  try {
    const {userId} = res.locals.user;
    if (!userId) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ result: false, message: "존재하지 않음" });
    }
    await myrecipe.deleteMany({ userId: userId })
    await store.deleteMany({ userId: userId })
    await favorite.deleteMany({ userId: userId })
    await comment.deleteMany({ userId: userId })
    await User.findByIdAndDelete(userId);
    return res.json({ result: true, message: "success" });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ result: false, message: "잘못된 요청", error });
  }
};

//카카오 콜백
const kakaoCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("kakao", { failureRedirect: "/" }, (err, user) => {
    if (err) return next(err);
    const token = jwt.sign(
      { user: user._id },
      config.jwt.secretKey as jwt.Secret,
      { expiresIn: "1d" }
    );
       
    res.redirect(`http://www.b-tender.com/oauth/token=${token}`);
  })(req, res, next);
};

//닉네임 변경하기
const changeNickname = async (req: Request, res: Response) => {
  const { nickname } = req.body;
  const { user } = res.locals;
  try {
    const existNickname = await User.findOne({ nickname });
    if (existNickname) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ result: false, message: "이미 존재" });
    } else {
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { nickname: nickname } }
      );
      return res.json({ result: true, message: "success" });
    }
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ result: false, message: "잘못된 요청", error });
  }
};

//비밀번호 변경 소셜로그인 여부확인
const checkSocial = async (req: Request, res: Response) => {
  try {
  const { userId } = res.locals.user; 
  const existUser = await User.findById({_id:userId});
 
  if(existUser?.provider==="b_tender"){
    return res.json({ result: true, message: "success" });
  }else{
    return res.json({ result: false, message: "success" });
  }    
 
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ result: false, message: "잘못된 요청", error });
  }
};

//비밀번호 변경하기
const changePassword = async (req: Request, res: Response) => {
  const { user } = res.locals;
  let existPassword = req.body.password;
  let newPassword = req.body.newpassword;
  try {
    if (!user) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ result: false, message: "존재하지 않는 유저" });
    }
    const check = await bcrypt.compare(existPassword, user!.password);
    if (!check) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ result: false, message: "비밀번호 불일치" });
    } else {
      newPassword = bcrypt.hashSync(newPassword, 10);
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { password: newPassword } }
      );
      return res.json({ result: true, message: "success" });
    }
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ result: false, message: "잘못된 요청", error });
  }
};

const getmypage = async (req: Request, res: Response) => {
  const user = res.locals.user;
  if (!user) {
    return res
      .status(HttpStatusCode.NOT_FOUND)
      .json({ result: false, message: "존재하지 않는 유저" });
  }
  return res.json({
    result: true,
    message: "success",
    createdposts: user.createdposts,
    createdposts_store: user.createdposts_store
  });
};

export default {
  signup,
  login,
  checkuser,
  kakaoCallback,
  withdrawal,
  changeNickname,
  checkSocial,
  changePassword,
  getmypage,
};
