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
userRouter.post("/logout", authMiddleware, userController.logout);

//마이페이지
// userRouter.get("/mypage", authMiddleware, userController.getmypage);

//kakao login
userRouter.get("/kakao", passport.authenticate("kakao"));
//kakao login callback
userRouter.get("/kakao/callback", userController.kakaoCallback);

export { userRouter };
