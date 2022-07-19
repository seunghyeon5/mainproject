import express from "express";
import recipeController from "../controllers/recipe";
import { authMiddleware } from "../middlewares/auth-middleware";

const recipeRouter = express.Router();

// 전체 리스트 출력하기
recipeRouter.get("/list/all", authMiddleware, recipeController.getRecipes);
// 레시피 상세정보 
recipeRouter.get("/list/:recipeId", authMiddleware, recipeController.getRecipe);
// 레시피 추천하기
recipeRouter.put("/list/:recipeId/recommend", authMiddleware, recipeController.recommendRecipe);

export { recipeRouter };