import express from "express";
import categoryController from "../controllers/category";

const categoryRouter = express.Router();

// 모든 카테고리 가져오기
categoryRouter.get("/", categoryController.getCategories);
// 특정 카테고리 가져오기
categoryRouter.get("/:categoryId", categoryController.getCategory);

export { categoryRouter };
