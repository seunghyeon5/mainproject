"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drinkRouter = void 0;
const express_1 = __importDefault(require("express"));
const drink_1 = __importDefault(require("../controllers/drink"));
const drinkRouter = express_1.default.Router();
exports.drinkRouter = drinkRouter;
// 전체 리스트 출력하기
drinkRouter.get("/list/all", drink_1.default.getDrinks);
// 주류 하나 가져오기
drinkRouter.get("/list/:drinkId", drink_1.default.getDrink);
// 카테고리별 주류 리스트 출력하기 
drinkRouter.get("/list/category/:categoryId", drink_1.default.getDrinksByCategory);
