import express from "express";
import recipeController from "../controllers/recipe";
import { authMiddleware } from "../middlewares/auth-middleware";

const recipeRouter = express.Router();

// 전체 리스트 출력하기
recipeRouter.get("/list/all", authMiddleware, recipeController.getRecipes);
// 레시피 상세정보
recipeRouter.get("/list/detail/:recipeId", authMiddleware, recipeController.getRecipe);
// 레피시 추천 상위 5
recipeRouter.get("/list/recommended", authMiddleware, recipeController.getMostRecommendedRecipes);
// 레시피 추천하기
recipeRouter.put("/list/recommend/:recipeId", authMiddleware, recipeController.recommendRecipe);
// 레시피 추천취소
recipeRouter.put("/list/undorecommend/:recipeId", authMiddleware, recipeController.undoRecommend);
// 레시피 검색
recipeRouter.get("/list/search/:search", authMiddleware, recipeController.searchRecipes);
// 추천 누른 레시피 불러오기
recipeRouter.get("/list/getrecipe", authMiddleware, recipeController.getMyrecipe);
//
recipeRouter.get("/list/getrelatedrecipes/:drink", authMiddleware, recipeController.getRelatedRecipes);

export { recipeRouter };
