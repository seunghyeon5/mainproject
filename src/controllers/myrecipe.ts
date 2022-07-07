import { Request, Response, NextFunction } from "express";
import MyRecipe from "../models/myrecipe";

//레시피 작성
const postrecipe = async (req: Request, res: Response) => {
    const { title, image, ingredients, brief_description } = req.body;
    const { nickname, userId } = res.locals.user;
    try {
        await MyRecipe.create({
            title,
            image,
            ingredients,
            brief_description,
            nickname,
            userId
        });
        res.json({ result: true });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};
//레시피 전체목록조회
const getAllrecipe = async (req: Request, res: Response) => {
    try {
        const myrecipe = await MyRecipe.find().sort({ createdAt: "desc" });
        res.json({ result: true, myrecipe });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};
//레시피 상세조회
const detailrecipe = async (req: Request, res: Response) => {
    try {
        const userId = String(res.locals.user.userId);
        const { myrecipeId } = req.params;
        const existsRecipe: any = await MyRecipe.findById(myrecipeId);
        res.json({ result: true, existsRecipe, userId });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};
//내가 쓴 레시피 조회
const getAllmyrecipe = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;
        const Myrecipe = await MyRecipe.find({ userId });
        console.log(userId);
        res.json({ result: true, Myrecipe });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};
//내가 쓴 레시피 삭제
const deleterecipe = async (req: Request, res: Response) => {
    const userId = String(res.locals.user.userId);
    const { myrecipeId } = req.params;
    const existsRecipe: any = await MyRecipe.findById(myrecipeId);

    try {
        if (existsRecipe.userId !== userId) {
            throw new Error("Error");
        } else {
            await MyRecipe.findByIdAndDelete(myrecipeId);
        }
        res.json({ result: true });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};
//내가 쓴 레시피 수정
const modifyrecipe = async (req: Request, res: Response) => {
    const userId = String(res.locals.user.userId);
    const { myrecipeId } = req.params;
    const { title, image, ingredients, brief_description } = req.body;
    const existsRecipe: any = await MyRecipe.findById(myrecipeId);
    console.log(existsRecipe);

    try {
        if (existsRecipe.userId !== userId) {
            return res.json({ message: false });
        } else {
            await MyRecipe.findByIdAndUpdate(myrecipeId, { $set: { title, image, ingredients, brief_description } });
        }
        res.json({ result: true, existsRecipe });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};

export default { postrecipe, getAllrecipe, deleterecipe, modifyrecipe, detailrecipe, getAllmyrecipe };
