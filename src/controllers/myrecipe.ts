import { Request, Response, NextFunction } from "express";
import MyRecipe from "../models/myrecipe";
import User from "../models/user";
import { IMyrecipe } from "../interfaces/myrecipe";

//레시피 작성
const postrecipe = async (req: Request, res: Response) => {
    const { title, image, ingredients, brief_description } = req.body;
    const userId = res.locals.user._id;
    const nickname = res.locals.user.nickname;
    try {
        if (!userId) {
            return res.json({ result: false, msg: "1" });
        }
        await MyRecipe.create({
            title,
            image,
            ingredients,
            brief_description,
            nickname,
            userId
        });
        const user = await User.findById({ _id: userId });
        if (!user) {
            res.json({ result: false, msg: "2" });
            return;
        }
        let num: number = user.createdposts;
        await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts: ++num } });
        return res.json({ result: true });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};

//레시피 전체목록조회
const getAllrecipe = async (req: Request, res: Response) => {
    try {
        const myrecipe: Array<IMyrecipe> = await MyRecipe.find().sort({ createdAt: "desc" });
        return res.json({ result: true, myrecipe });
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
        return res.json({ result: true, existsRecipe, userId });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};

//내가 쓴 레시피 조회
const getAllmyrecipe = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;
        if (!userId) {
            return res.json({ result: false, msg: "1" });
        }
        const Myrecipe = await MyRecipe.find({ userId });
        // console.log(userId);
        res.json({ result: true, Myrecipe });
        return;
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};

//내가 쓴 레시피 삭제
const deleterecipe = async (req: Request, res: Response) => {
    const userId = String(res.locals.user._id);
    const { myrecipeId } = req.params;
    const existsRecipe: any = await MyRecipe.findById(myrecipeId);
    const user: any = await User.findById({ _id: userId });
    // console.log(userId);

    try {
        if (!user) {
            return res.json({ result: false, msg: "1" });
        }
        if (existsRecipe.userId !== userId) {
            res.json({ result: false, message: "2" });
            return;
        } else {
            await MyRecipe.findByIdAndDelete(myrecipeId);
            let num: number = user.createdposts;
            await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts: --num } });
            return res.json({ result: true });
        }
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
    // console.log(existsRecipe);

    try {
        if (existsRecipe.userId !== userId) {
            return res.json({ result: false, msg: "1" });
        } else {
            await MyRecipe.findByIdAndUpdate(myrecipeId, { $set: { title, image, ingredients, brief_description } });
            return res.json({ result: true, existsRecipe });
        }
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};

export default { postrecipe, getAllrecipe, deleterecipe, modifyrecipe, detailrecipe, getAllmyrecipe };
