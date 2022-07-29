import express from "express";
import myrecipeController from "../controllers/myrecipe";
import { authMiddleware } from "../middlewares/auth-middleware";
import { imageuploader } from "../middlewares/image-uploader";

const myrecipeRouter = express.Router();
// 레시피 작성
myrecipeRouter.post("/post", authMiddleware,imageuploader.single("image"), myrecipeController.postRecipe);
// 레시피 전체목록 조회
myrecipeRouter.get("/post/list", authMiddleware, myrecipeController.getAllRecipes);
// 내가 쓴 레시피 조회
myrecipeRouter.get("/post/getmyrecipe", authMiddleware, myrecipeController.getAllMyRecipe);
// 레시피 상세조회
myrecipeRouter.get("/post/detail/:myrecipeId", authMiddleware, myrecipeController.detailRecipe);
// 레시피 삭제
myrecipeRouter.delete("/:myrecipeId/delete", authMiddleware, myrecipeController.deleteRecipe);

export { myrecipeRouter };
