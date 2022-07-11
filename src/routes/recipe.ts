import express from "express";
import recipeController from "../controllers/recipe";

const recipeRouter = express.Router();

// 전체 리스트 출력하기
recipeRouter.get("/list/all", recipeController.getRecipes);
// 레시피 상세정보 
recipeRouter.get("/list/:recipeId", recipeController.getRecipe);

export { recipeRouter };