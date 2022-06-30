import express, { Request, Response, NextFunction, Router } from "express";
import controller from "../controllers/user";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = express.Router();

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/me", authMiddleware, controller.checkuser);
router.delete("/", authMiddleware, controller.withdrawal);

//kakao login
router.get("/kakao", passport.authenticate("kakao"));
//kakao login callback
router.get("/kakao/callback", controller.kakaoCallback);

export = router;
