import express from "express";
import drinkController from "../controllers/drink";


const drinkRouter = express.Router();

// 전체 리스트 출력하기
drinkRouter.get("/list/all", drinkController.getDrinks);

// 주류 하나 가져오기
drinkRouter.get("/list/:drinkId", drinkController.getDrink);


// 카테고리별 리스트 출력하기 
//drinkRouter.get("/categorylist", dController.getdByCategory);
export { drinkRouter };