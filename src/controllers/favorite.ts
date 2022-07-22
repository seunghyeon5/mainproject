import { Request, Response, NextFunction } from "express";
import Favorite from "../models/favorite";
import { IFavorite } from "../interfaces/favorite";
import myrecipe from "../models/myrecipe";
import Mystore from "../models/store";

//마이레시피에 좋아요 누르기
const postlike = async (req: Request, res: Response) => {
    const userId = String(res.locals.user._id);
    const nickname = String(res.locals.user.nickname);
    const { myrecipeId } = req.params;
    try {
        const existLike = await Favorite.findOne({ _id: userId, myrecipeId: myrecipeId, nickname: nickname });
        const Myrecipe = await myrecipe.findById({ _id: myrecipeId });
        if (!Myrecipe) {
            return res.json({ result: false, msg: "존재하지 않는 값입니다." });
        }
        if (existLike) {
            return res.json({ result: false, msg: "이미 좋아요를 누르셨습니다." });
        } else {
            const favorite = await Favorite.create({
                userId,
                myrecipeId,
                nickname
            });
            let num: number = Myrecipe.favorite_count;
            await myrecipe.findOneAndUpdate({ _id: myrecipeId }, { $set: { favorite_count: ++num } });
            return res.json({ result: true, favorite });
        }
    } catch (err) {
        console.log(err);
        res.json({ result: false });
        return;
    }
};

//마이레시피에 좋아요 누른사람 조회
const getAlluser = async (req: Request, res: Response) => {
    const { myrecipeId } = req.params;
    try {
        const getUser: Array<IFavorite> = await Favorite.find({ myrecipeId });
        res.json({ result: true, getUser });
        return;
    } catch (err) {
        console.log(err);
        res.json({ result: false });
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
            res.json({ result: false, msg: "존재하지 않는 값입니다." });
            return;
        }
        if (!findUser) {
            return res.json({ result: false, msg: "좋아요를 누르지 않았습니다." });
        } else {
            await Favorite.findByIdAndDelete(findUser);
            let num: number = Myrecipe.favorite_count;
            await myrecipe.findOneAndUpdate({ _id: myrecipeId }, { $set: { favorite_count: --num } });
            return res.json({ result: true });
        }
    } catch (err) {
        console.log(err);
        res.json({ result: false });
        return;
    }
};

//내가 좋아요 누른 마이레시피 조회
const getMyrecipe = async (req: Request, res: Response) => {
    const userId = String(res.locals.user._id);
    try {
        const getMyrecipe: Array<IFavorite> = await Favorite.find({ userId });

        res.json({ result: true, getMyrecipe });
    } catch (err) {
        console.log(err);
        res.json({ result: false });
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
        const existLike = await Favorite.findOne({ _id: userId, MystoreId: MystoreId, nickname: nickname });
        const Store = await Mystore.findById({ _id: MystoreId });
        if (!Store) {
            res.json({ result: false, msg: "존재하지 않는 값입니다." });
            return;
        }
        if (existLike) {
            return res.json({ result: false, msg: "이미 좋아요를 누르셨습니다." });
        } else {
            const favorite = await Favorite.create({
                userId,
                MystoreId,
                nickname
            });
            let num: number = Store.favorite_count;
            await myrecipe.findOneAndUpdate({ _id: MystoreId }, { $set: { favorite_count: ++num } });
            return res.json({ result: true, favorite });
        }
    } catch (err) {
        console.log(err);
        res.json({ result: false });
        return;
    }
};

// 마이스토어 좋아요 누른 사람 조회
const getAllstoreuser = async (req: Request, res: Response) => {
    const { MystoreId } = req.params;
    try {
        const getUser: Array<IFavorite> = await Favorite.find({ MystoreId });
        res.json({ result: true, getUser });
    } catch (err) {
        console.log(err);
        res.json({ result: false });
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
            res.json({ result: false, msg: "존재하지 않는 값입니다." });
            return;
        }
        if (!findUser) {
            return res.json({ result: false, msg: "좋아요를 누르지 않았습니다." });
        } else {
            await Favorite.findByIdAndDelete(findUser);
            let num: number = Store.favorite_count;
            await myrecipe.findOneAndUpdate({ _id: MystoreId }, { $set: { favorite_count: --num } });
            return res.json({ result: true });
        }
    } catch (err) {
        console.log(err);
        res.json({ result: false });
    }
};

//내가 좋아요 누른 스토어 조회
const getMystore = async (req: Request, res: Response) => {
    const userId = String(res.locals.user._id);
    try {
        const getMystore: Array<IFavorite> = await Favorite.find({ userId });
        res.json({ result: true, getMystore });
    } catch (err) {
        console.log(err);
        res.json({ result: false });
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
    getMystore
};
