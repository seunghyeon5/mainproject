import { Request, Response } from "express";
import Categories from "../models/category";
import HttpStatusCode from "../common/httpStatusCode";

// 전체 카테고리 조회
const getCategories = async (req: Request, res: Response) => {
    try {
        const drinkCategories = await Categories.find().exec();
        return res.json({ result: true, message: "success", drinkCategories });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
    }
};

// 특정 카테고리 가져오기
const getCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const drinkCategory = await Categories.findById(categoryId).exec();

        if (drinkCategory) {
            return res.json({ result: true, message: "success", drinkCategory });
        } else {
            return res.status(HttpStatusCode.NOT_FOUND).json({ result: false, message: "no exist category" });
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
    }
};

export default {
    getCategories,
    getCategory
};
