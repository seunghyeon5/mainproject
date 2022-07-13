import { Request, Response } from "express";
import Categories from "../models/category";
import { ICategory } from "../interfaces/category";

// 전체 카테고리 조회
const getCategories = async (req: Request, res: Response) => {
    try {
        const drinkCategories: Array<ICategory> = await Categories.find().lean();

        res.json({ message: "success", drinkCategories });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
};

// 특정 카테고리 가져오기
const getCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        //console.log(categoryId);
        const drinkCategory: ICategory | null = await Categories.findById(categoryId).lean();

        if (drinkCategory) {
            res.json({ message: "success", drinkCategory });
        } else {
            res.status(406).json({ message: "fail", error: "no exist category" });
        }
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
};

export default {
    getCategories,
    getCategory
};
