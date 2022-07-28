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
// favoriteRouter.get("/getmyrecipe", authMiddleware, favoriteController.getMyrecipe);

//마이 스토어에 좋아요 누르기
favoriteRouter.post("/store/:MystoreId", authMiddleware, favoriteController.postStorelike);
//마이스토어 좋아요 누른사람 조회
favoriteRouter.get("/store/:MystoreId/list", favoriteController.getAllstoreuser);
//좋아요 취소하기
favoriteRouter.delete("/store/:MystoreId/delete", authMiddleware, favoriteController.deleteStorelike);
//내가 좋아요누른 마이레시피 조회
favoriteRouter.get("/store/getmystore", authMiddleware, favoriteController.getMystore);

export { favoriteRouter };
