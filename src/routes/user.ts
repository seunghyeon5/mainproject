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
userRouter.get("/checksocial",authMiddleware, userController.checkSocial);
userRouter.put("/changepassword", bodyValidator(CreateUserDto), authMiddleware, userController.changePassword);

//마이페이지
userRouter.get("/mypage", authMiddleware, userController.getmypage);

//kakao login
userRouter.get("/kakao", passport.authenticate("kakao"));
//kakao login callback
userRouter.get("/kakao/callback", userController.kakaoCallback);

export { userRouter };
