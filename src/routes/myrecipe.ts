import express from "express";
import myrecipeController from "../controllers/myrecipe";
import { authMiddleware } from "../middlewares/auth-middleware";

const myrecipeRouter = express.Router();

myrecipeRouter.post("/post", authMiddleware, myrecipeController.postrecipe);
myrecipeRouter.get("/post/list", authMiddleware, myrecipeController.checkrecipe);
myrecipeRouter.delete("/post/:myrecipeId/delete", authMiddleware, myrecipeController.deleterecipe);
myrecipeRouter.put("/post/:myrecipeId/modify", authMiddleware, myrecipeController.modifyrecipe);

export { myrecipeRouter };
