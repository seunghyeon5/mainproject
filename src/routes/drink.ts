import express from "express";
import drinkController from "../controllers/drink";
import { authMiddleware } from "../middlewares/auth-middleware";

const drinkRouter = express.Router();

// 전체 리스트 출력하기
drinkRouter.get("/list/all", authMiddleware, drinkController.getDrinks);
// 주류 하나 가져오기
drinkRouter.get("/list/:drinkId", authMiddleware, drinkController.getDrink);
// 카테고리별 주류 리스트 출력하기
drinkRouter.get("/list/category/:categoryId", authMiddleware, drinkController.getDrinksByCategory);
// 술냉장고에 술 넣기
drinkRouter.post("/list/:drinkId/post", authMiddleware, drinkController.addDrink);
// 술냉장고 술 삭제하기
drinkRouter.delete("/list/:drinkId/delete", authMiddleware, drinkController.deleteDrink);
// 술냉장고 이미지 불러오기
drinkRouter.get("/drinkimage", authMiddleware, drinkController.getMydrinks);
// 술 추천누르기
drinkRouter.put("/list/recommend/:drinkId", authMiddleware, drinkController.recommendDrink);
// 술 추천 취소하기
drinkRouter.put("/list/undorecommend/:drinkId", authMiddleware, drinkController.undoRecommend);
// 추천누른 술 불러오기
drinkRouter.get("/recommendlist", authMiddleware, drinkController.recommendlist);

export { drinkRouter };
