import express, { Request, Response, NextFunction, Router } from "express";
import userController from "../controllers/user";
import passport from "passport";
import user_validation from "../vaildation/user.val";
import { authMiddleware } from "../middlewares/auth-middleware";

const userRouter = express.Router();

userRouter.post("/signup", user_validation.user_signUp, userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/me", authMiddleware, userController.checkuser);
userRouter.delete("/", authMiddleware, userController.withdrawal);
userRouter.put("/changenick", user_validation.user_changenickname, authMiddleware, userController.changeNickname);
userRouter.put("/changepassword", user_validation.user_changepassword, authMiddleware, userController.changePassword);

//마이페이지
// userRouter.get("/mypage", authMiddleware, userController.getmypage);

//kakao login
userRouter.get("/kakao", passport.authenticate("kakao"));
//kakao login callback
userRouter.get("/kakao/callback", userController.kakaoCallback);

// 구글 로그인
userRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
    
  // 구글 로그인 Callback
userRouter.get("/google/callback", userController.googleCallback);

export { userRouter };
