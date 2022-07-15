"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRouter = void 0;
const express_1 = __importDefault(require("express"));
const recipe_1 = __importDefault(require("../controllers/recipe"));
const auth_middleware_1 = require("../middlewares/auth-middleware");
const recipeRouter = express_1.default.Router();
exports.recipeRouter = recipeRouter;
// 전체 리스트 출력하기
recipeRouter.get("/list/all", auth_middleware_1.authMiddleware, recipe_1.default.getRecipes);
// 레시피 상세정보 
recipeRouter.get("/list/:recipeId", auth_middleware_1.authMiddleware, recipe_1.default.getRecipe);
