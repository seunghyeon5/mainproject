import express from "express";
import userController from "../controllers/user";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth-middleware";
import { bodyValidator } from "../middlewares/dto";
import { CreateUserDto } from "../vaildation/user.val";

const userRouter = express.Router();

// 회원가입
userRouter.post("/signup", bodyValidator(CreateUserDto), userController.signup);
// 로그인
userRouter.post("/login", userController.login);
// 로그인한 유정정보 가져오기
userRouter.get("/me", authMiddleware, userController.checkuser);
// 회원탈퇴
userRouter.delete("/", authMiddleware, userController.withdrawal);
// 닉네임 변경
userRouter.put("/changenick", bodyValidator(CreateUserDto), authMiddleware, userController.changeNickname);
// 소셜로그인인지 일반로그인인지 확인
userRouter.get("/checksocial", authMiddleware, userController.checkSocial);
// 비밀번호 변경
userRouter.put("/changepassword", bodyValidator(CreateUserDto), authMiddleware, userController.changePassword);
// 마이페이지
userRouter.get("/mypage", authMiddleware, userController.getmypage);
// kakao login
userRouter.get("/kakao", passport.authenticate("kakao"));
// kakao login callback
userRouter.get("/kakao/callback", userController.kakaoCallback);

export { userRouter };
