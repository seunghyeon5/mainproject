import express from "express";
import myrecipeController from "../controllers/myrecipe";
import { authMiddleware } from "../middlewares/auth-middleware";

const myrecipeRouter = express.Router();
//레시피 작성
myrecipeRouter.post("/post", authMiddleware, myrecipeController.postrecipe);
//레시피 전체목록 조회
myrecipeRouter.get("/post/list", myrecipeController.getAllrecipe);
//내가 쓴 레시피 조회
myrecipeRouter.get("/post/:userId", authMiddleware, myrecipeController.getAllmyrecipe);
//레시피 상세조회
myrecipeRouter.get("/post/:myrecipeId", authMiddleware, myrecipeController.detailrecipe);
//레시피 삭제
myrecipeRouter.delete("/:myrecipeId/delete", authMiddleware, myrecipeController.deleterecipe);
//레시피 수정
myrecipeRouter.put("/:myrecipeId/modify", authMiddleware, myrecipeController.modifyrecipe);

export { myrecipeRouter };
