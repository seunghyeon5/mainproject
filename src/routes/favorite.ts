import express from "express";
import favoriteController from "../controllers/favorite";
import { authMiddleware } from "../middlewares/auth-middleware";

const favoriteRouter = express.Router();
//마이레시피에 좋아요 누르기
favoriteRouter.post("/:myrecipeId", authMiddleware, favoriteController.postlike);
//마이레시피 좋아요 누른사람 조회
favoriteRouter.get("/:myrecipeId/list", favoriteController.getAlluser);
//좋아요 취소하기
favoriteRouter.delete("/:myrecipeId/delete", authMiddleware, favoriteController.deletelike);
//내가 좋아요누른 마이레시피 조회
favoriteRouter.get("/getmyrecipe", authMiddleware, favoriteController.getMyrecipe);

//마이 스토어에 좋아요 누르기
favoriteRouter.post("/:mystoreId", authMiddleware, favoriteController.postlike);
//마이스토어 좋아요 누른사람 조회
favoriteRouter.get("/:mystoreId/list", favoriteController.getAlluser);
//좋아요 취소하기
favoriteRouter.delete("/:mystoreId/delete", authMiddleware, favoriteController.deletelike);
//내가 좋아요누른 마이레시피 조회
favoriteRouter.get("/getmystore", authMiddleware, favoriteController.getMyrecipe);





export { favoriteRouter };
