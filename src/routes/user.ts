import express, { Request, Response, NextFunction, Router } from "express";
import controller from "../controllers/user";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = express.Router();

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/me", authMiddleware, controller.checkuser);

export = router;
