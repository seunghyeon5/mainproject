"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const passport_1 = __importDefault(require("passport"));
const user_val_1 = __importDefault(require("../vaildation/user.val"));
const auth_middleware_1 = require("../middlewares/auth-middleware");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/signup", user_val_1.default.user_signUp, user_1.default.signup);
userRouter.post("/login", user_1.default.login);
userRouter.get("/me", auth_middleware_1.authMiddleware, user_1.default.checkuser);
userRouter.delete("/", auth_middleware_1.authMiddleware, user_1.default.withdrawal);
userRouter.put("/changenick", user_val_1.default.user_changenickname, auth_middleware_1.authMiddleware, user_1.default.changeNickname);
userRouter.put("/changepassword", user_val_1.default.user_changepassword, auth_middleware_1.authMiddleware, user_1.default.changePassword);
//마이페이지
userRouter.get("/mypage", auth_middleware_1.authMiddleware, user_1.default.getmypage);
//kakao login
userRouter.get("/kakao", passport_1.default.authenticate("kakao"));
//kakao login callback
userRouter.get("/kakao/callback", user_1.default.kakaoCallback);
// 구글 로그인
userRouter.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"]
}));
// 구글 로그인 Callback
userRouter.get("/google/callback", user_1.default.googleCallback);
