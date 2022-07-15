"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_1 = __importDefault(require("../controllers/category"));
const categoryRouter = express_1.default.Router();
exports.categoryRouter = categoryRouter;
// 모든 카테고리 가져오기
categoryRouter.get("/", category_1.default.getCategories);
// 특정 카테고리 가져오기
categoryRouter.get("/:categoryId", category_1.default.getCategory);
