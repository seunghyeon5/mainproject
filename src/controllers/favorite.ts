import { Request, Response, NextFunction } from "express";
import Favorite from "../models/favorite";
import { IFavorite } from "../interfaces/favorite";
import myrecipe from "../models/myrecipe";
import Mystore from "../models/store";
import { IStore } from "../interfaces/store";
import Drinks from "../models/drink";
import HttpStatusCode from "../common/httpStatusCode";
import { IDrink } from "../interfaces/drink";

//마이레시피에 좋아요 누르기
const postlike = async (req: Request, res: Response) => {
    const { userId } = res.locals.user;
    const { nickname } = res.locals.user;
    const { myrecipeId } = req.params;
    try {
        const existLike = await Favorite.findOne({ $and: [{ userId: userId }, { myrecipeId: myrecipeId }, { category: "myrecipe" }] });
        const Myrecipe = await myrecipe.findById({ _id: myrecipeId });
        if (!Myrecipe) {
            return res.status(HttpStatusCode.NO_CONTENT).json({ result: false, msg: "존재하지 않는 값입니다." });
        }
        if (existLike) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, msg: "이미 좋아요를 누르셨습니다." });
        } else {
            const favorite = await Favorite.create({
                userId,
                Myrecipe,
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
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
        return;
    }
};

//마이레시피 좋아요 취소
const deletelike = async (req: Request, res: Response) => {
    const { myrecipeId } = req.params;
    const { userId } = res.locals.user;
    const { nickname } = res.locals.user;
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
// const getMyrecipe = async (req: Request, res: Response) => {
//     const { userId } = res.locals.user;
//     try {
//         const getMyrecipe: Array<IFavorite> = await Favorite.find({ userId, category: "myrecipe" });

//         res.status(HttpStatusCode.OK).json({ result: true, message: "success", getMyrecipe });
//     } catch (err) {
//         console.log(err);
//         res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
//         return;
//     }
// };

// Mystore
// 마이스토어 좋아요 누르기
const postStorelike = async (req: Request, res: Response) => {
    const { userId } = res.locals.user;
    const { nickname } = res.locals.user;
    const { MystoreId } = req.params;
    try {
        const existLike = await Favorite.findOne({ $and: [{ userId: userId }, { MystoreId: MystoreId }, { category: "mystore" }] });
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
                Store,
                nickname,
                category: "mystore"
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
        res.status(HttpStatusCode.OK).json({ result: true, message: "success", getUser });
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
    }
};

// 마이스토어 좋아요 삭제
const deleteStorelike = async (req: Request, res: Response) => {
    const { MystoreId } = req.params;
    const { userId } = res.locals.user;
    try {
        const findUser = await Favorite.findOne({ $and: [{ userId: userId }, { MystoreId: MystoreId }, { category: "mystore" }] });
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
    const { userId } = res.locals.user;
    try {
        const getMystore: Array<IFavorite> = await Favorite.find({ userId, category: "mystore" });
        res.status(HttpStatusCode.OK).json({ result: true, message: "success", getMystore });
    } catch (err) {
        console.log(err);
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
    }
};

export default {
    postlike,
    getAlluser,
    deletelike,
    // getMyrecipe,
    postStorelike,
    getAllstoreuser,
    deleteStorelike,
    getMystore,
};
