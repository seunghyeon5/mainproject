import { Request, Response, NextFunction } from "express";
import Favorite from "../models/favorite";
import { IFavorite } from "../interfaces/favorite";
import myrecipe from "../models/myrecipe";
import Mystore from "../models/store";
import { IStore } from "../interfaces/store";
import Drinks from "../models/drink"
import HttpStatusCode from "../common/httpStatusCode";
import { IDrink } from "../interfaces/drink";


//마이레시피에 좋아요 누르기
const postlike = async (req: Request, res: Response) => {
    const userId = String(res.locals.user._id);
    const nickname = String(res.locals.user.nickname);
    const { myrecipeId } = req.params;
    try {
        const existLike = await Favorite.findOne({ userId, myrecipeId, nickname });
        // console.log(existLike)
        const Myrecipe = await myrecipe.findById({ _id: myrecipeId });
        if (!Myrecipe) {
            return res.status(HttpStatusCode.NO_CONTENT).json({ result: false, msg: "존재하지 않는 값입니다." });
        }
        if (existLike) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, msg: "이미 좋아요를 누르셨습니다." });
        } else {
            const favorite = await Favorite.create({
                userId,
                myrecipeId,
                nickname,
                category: "myrecipe"
            });
            let num: number = Myrecipe.favorite_count;
            await myrecipe.findOneAndUpdate({ _id: myrecipeId }, { $set: { favorite_count: ++num } });
            return res.status(HttpStatusCode.CREATED).json({ result: true, favorite });
        }
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
        return;
    }
};

//마이레시피에 좋아요 누른사람 조회
const getAlluser = async (req: Request, res: Response) => {
    const { myrecipeId } = req.params;
    try {
        const getUser: Array<IFavorite> = await Favorite.find({ myrecipeId });
        res.status(HttpStatusCode.OK).json({ result: true, message: "success", getUser });
        return;
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message:"잘못된 접근" });
        return;
    }
};

//마이레시피 좋아요 취소
const deletelike = async (req: Request, res: Response) => {
    const { myrecipeId } = req.params;
    const userId = String(res.locals.user._id);
    const nickname = String(res.locals.user.nickname);
    try {
        const findUser = await Favorite.findOne({ userId, myrecipeId, nickname });
        const Myrecipe = await myrecipe.findById({ _id: myrecipeId });
        if (!Myrecipe) {
            res.status(HttpStatusCode.NO_CONTENT).json({ result: false, msg: "존재하지 않는 값입니다." });
            return;
        }
        if (!findUser) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, msg: "좋아요를 누르지 않았습니다." });
        } else {
            await Favorite.findByIdAndDelete(findUser);
            let num: number = Myrecipe.favorite_count;
            await myrecipe.findOneAndUpdate({ _id: myrecipeId }, { $set: { favorite_count: --num } });
            return res.status(HttpStatusCode.OK).json({ result: true, message: "success" });
        }
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
        return;
    }
};

//내가 좋아요 누른 마이레시피 조회
const getMyrecipe = async (req: Request, res: Response) => {
    const userId = String(res.locals.user._id);
    try {
        const getMyrecipe: Array<IFavorite> = await Favorite.find({ userId, category:"myrecipe" });

        res.status(HttpStatusCode.OK).json({ result: true, message: "success", getMyrecipe });
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
        return;
    }
};

// Mystore
// 마이스토어 좋아요 누르기
const postStorelike = async (req: Request, res: Response) => {
    const userId = String(res.locals.user._id);
    const nickname = String(res.locals.user.nickname);
    const { MystoreId } = req.params;
    try {
        const existLike = await Favorite.findOne({ userId, MystoreId, nickname });
        const Store: IStore | null = await Mystore.findById({ _id: MystoreId });
        if (!Store) {
            res.status(HttpStatusCode.NO_CONTENT).json({ result: false, msg: "존재하지 않는 값입니다." });
            return;
        }
        if (existLike) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, msg: "이미 좋아요를 누르셨습니다." });
        } else {
            const favorite = await Favorite.create({
                userId,
                MystoreId,
                nickname,
                category:"mystore"
            });
            let num: number = Store.favorite_count;
            await Mystore.findOneAndUpdate({ _id: MystoreId }, { $set: { favorite_count: ++num } });
            return res.status(HttpStatusCode.CREATED).json({ result: true, message: "success", favorite });
        }
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
        return;
    }
};

// 마이스토어 좋아요 누른 사람 조회
const getAllstoreuser = async (req: Request, res: Response) => {
    const { MystoreId } = req.params;
    try {
        const getUser: Array<IFavorite> = await Favorite.find({ MystoreId });
        res.status(HttpStatusCode.OK).json({ result: true, message:"success", getUser });
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
    }
};

// 마이스토어 좋아요 삭제
const deleteStorelike = async (req: Request, res: Response) => {
    const { MystoreId } = req.params;
    const userId = String(res.locals.user._id);
    const nickname = String(res.locals.user.nickname);
    try {
        const findUser = await Favorite.findOne({ userId, MystoreId, nickname });
        const Store = await Mystore.findById({ _id: MystoreId });
        if (!Store) {
            res.status(HttpStatusCode.NO_CONTENT).json({ result: false, msg: "존재하지 않는 값입니다." });
            return;
        }
        if (!findUser) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, msg: "좋아요를 누르지 않았습니다." });
        } else {
            await Favorite.findByIdAndDelete(findUser);
            let num: number = Store.favorite_count;
            await Mystore.findOneAndUpdate({ _id: MystoreId }, { $set: { favorite_count: --num } });
            return res.status(HttpStatusCode.OK).json({ result: true, message: "success" });
        }
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
    }
};

//내가 좋아요 누른 스토어 조회
const getMystore = async (req: Request, res: Response) => {
    const userId = String(res.locals.user._id);
    try {
        const getMystore: Array<IFavorite> = await Favorite.find({ userId, category:"mystore" });
        res.status(HttpStatusCode.OK).json({ result: true, message:"success", getMystore });
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message:"잘못된 접근" });
    }
};

//술에 좋아요 누르기
const drinklike = async (req: Request, res: Response) => {
    const userId = String(res.locals.user._id);
    const nickname = String(res.locals.user.nickname);
    const { drinkId } = req.params;
    try {
        const existLike = await Favorite.findOne({ userId, drinkId, nickname });
        const drinks:IDrink | null = await Drinks.findById({ _id: drinkId });
        if (!drinks) {
            return res.status(HttpStatusCode.NO_CONTENT).json({ result: false, message: "술 정보가 올바르지 않습니다." });
        }
        if (existLike) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "이미 좋아요를 누르셨습니다." });
        } else {
            const favorite = await Favorite.create({
                drinkId,
                userId,
                nickname,
                category: "drink"
            });
            return res.status(HttpStatusCode.CREATED).json({ result: true, message: "success", favorite });
        }
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청" });
        return;
    }
};

//술 좋아요 취소
const deletedrink = async (req: Request, res: Response) => {
    const { drinkId } = req.params;
    const userId = String(res.locals.user._id);
    const nickname = String(res.locals.user.nickname);
    try {
        const findUser = await Favorite.findOne({ userId, drinkId, nickname });
        const drinks = await Drinks.findById({ _id: drinkId });
        if (!drinks) {
            res.status(HttpStatusCode.NO_CONTENT).json({ result: false, msg: "술 정보가 올바르지 않습니다." });
            return;
        }
        if (!findUser) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, msg: "좋아요를 누르지 않았습니다." });
        } else {
            await Favorite.findByIdAndDelete(findUser);
            return res.status(HttpStatusCode.OK).json({ result: true });
        }
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false });
        return;
    }
};

//내가 좋아요 누른 술 조회
const getdrinks = async (req: Request, res: Response) => {
    const userId = String(res.locals.user._id);
    try {
        const getMydrink: Array<IFavorite> = await Favorite.find({ userId, category:"drink" });
        res.status(HttpStatusCode.OK).json({ result: true, message: "success", getMydrink });
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, messsage: "잘못된 접근" });
    }
};

export default {
    postlike,
    getAlluser,
    deletelike,
    getMyrecipe,
    postStorelike,
    getAllstoreuser,
    deleteStorelike,
    getMystore,
    drinklike,
    deletedrink,
    getdrinks,
};
