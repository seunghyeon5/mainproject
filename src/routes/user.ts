import express, { Request, Response, NextFunction, Router } from "express";
import userController from "../controllers/user";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth-middleware";
import { bodyValidator } from "../middlewares/dto";
import { CreateUserDto } from "../vaildation/user.val";

const userRouter = express.Router();

userRouter.post("/signup", bodyValidator(CreateUserDto),userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/me", authMiddleware, userController.checkuser);
userRouter.delete("/", authMiddleware, userController.withdrawal);
userRouter.put("/changenick", bodyValidator(CreateUserDto), authMiddleware, userController.changeNickname);
userRouter.put("/changepassword", bodyValidator(CreateUserDto), authMiddleware, userController.changePassword);

//마이페이지
userRouter.get("/mypage", authMiddleware, userController.getmypage);

//kakao login
userRouter.get("/kakao", passport.authenticate("kakao"));
//kakao login callback
userRouter.get("/kakao/callback", userController.kakaoCallback);

// 구글 로그인scope:"openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
//userRouter.get( "/google", passport.authenticate("google", { scope: ["profile", "email"] }));
userRouter.get( "/google", passport.authenticate("google", { scope: [
'https://www.googleapis.com/auth/userinfo.profile',
'profile',
'https://www.googleapis.com/auth/plus.login',
'https://www.googleapis.com/auth/userinfo.email'] }));

// 구글 로그인 Callback
userRouter.get("/google/callback", userController.googleCallback);

export { userRouter };
