import { Request, Response, NextFunction } from "express";
import Favorite from "../models/favorite";
import { IFavorite } from "../interfaces/favorite";
import myrecipe from "../models/myrecipe";
import Mystore from "../models/store";
import { IStore } from "../interfaces/store";
import HttpStatusCode from "../common/httpStatusCode";

//마이레시피에 좋아요 누르기
const postlike = async (req: Request, res: Response) => {
    const { userId } = res.locals.user;
    const { nickname } = res.locals.user;
    const { myrecipeId } = req.params;
    try {
        const existLike = await Favorite.findOne({ $and: [{ userId: userId }, { myfavoritesId: myrecipeId }, { category: "myrecipe" }] });
        const Myrecipe = await myrecipe.findById({ _id: myrecipeId });
        if (!Myrecipe) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "존재하지 않는 값입니다." });
        }
        if (existLike) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "이미 좋아요를 누르셨습니다." });
        } else {
            const favorite = await Favorite.create({
                nickname,
                myfavoritesId: myrecipeId,
                userId,
                category: "myrecipe",
                myfavoritesInfo: {
                    _id: Myrecipe._id,
                    title: Myrecipe.title,
                    image: Myrecipe.image,
                    brief_description: Myrecipe.brief_description                  
                }               
            });
            let num: number = Myrecipe.favorite_count;
            await myrecipe.findOneAndUpdate({ _id: myrecipeId }, { $set: { favorite_count: ++num } });
            return res.status(HttpStatusCode.CREATED).json({ result: true, message: "success", favorite });
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

//마이레시피에 좋아요 누른사람 조회
const getAlluser = async (req: Request, res: Response) => {
    const { myrecipeId } = req.params;
    try {
        const getUser: Array<IFavorite> = await Favorite.find({ myfavoritesId: myrecipeId });
        res.json({ result: true, message: "success", getUser });
        return;
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

//마이레시피 좋아요 취소
const deletelike = async (req: Request, res: Response) => {
    const { myrecipeId } = req.params;
    const { userId } = res.locals.user;
    const { nickname } = res.locals.user;
    try {
        const findUser = await Favorite.findOne({ userId, myfavoritesId:myrecipeId, nickname });
        const Myrecipe = await myrecipe.findById({ _id: myrecipeId });
        if (!Myrecipe) {
            res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, msg: "레시피아이디값이 올바르지 않습니다." });
            return;
        }
        if (!findUser) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, msg: "좋아요를 누르지 않았습니다." });
        } else {
            await Favorite.findByIdAndDelete(findUser);
            let num: number = Myrecipe.favorite_count;
            await myrecipe.findOneAndUpdate({ _id: myrecipeId }, { $set: { favorite_count: --num } });
            return res.json({ result: true, message: "success" });
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

// Mystore
// 마이스토어 좋아요 누르기
const postStorelike = async (req: Request, res: Response) => {
    const { userId } = res.locals.user;
    const { nickname } = res.locals.user;
    const { MystoreId } = req.params;
    try {
        const existLike = await Favorite.findOne({ $and: [{ userId: userId }, { myfavoritesId: MystoreId }, { category: "mystore" }] });
        const Store: IStore | null = await Mystore.findById({ _id: MystoreId });
        if (!Store) {
            res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "스토어아이디값이 올바르지 않습니다." });
            return;
        }
        if (existLike) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "이미 좋아요를 누르셨습니다." });
        } else {
            const favorite = await Favorite.create({
                nickname,
                myfavoritesId: MystoreId,
                userId,
                category: "mystore",
                myfavoritesInfo: Store,   
            });
            let num: number = Store.favorite_count;
            await Mystore.findOneAndUpdate({ _id: MystoreId }, { $set: { favorite_count: ++num } });
            return res.status(HttpStatusCode.CREATED).json({ result: true, message: "success", favorite });
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

// 마이스토어 좋아요 누른 사람 조회
const getAllstoreuser = async (req: Request, res: Response) => {
    const { MystoreId } = req.params;
    try {
        const getUser: Array<IFavorite> = await Favorite.find({ myfavoritesId: MystoreId });
        res.json({ result: true, message: "success", getUser });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

// 마이스토어 좋아요 삭제
const deleteStorelike = async (req: Request, res: Response) => {
    const { MystoreId } = req.params;
    const { userId } = res.locals.user;
    try {
        const findUser = await Favorite.findOne({ $and: [{ userId: userId }, { myfavoritesId: MystoreId }, { category: "mystore" }] });
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
            return res.json({ result: true, message: "success" });
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

//내가 좋아요 누른 스토어 조회
const getMystore = async (req: Request, res: Response) => {
    const { userId } = res.locals.user;
    try {
        const getMystore = await Favorite.find({ userId, category: "mystore" });
        const temp = getMystore.map((a) => a.myfavoritesInfo)
        let stores = []
        stores = temp.map((e:any) => ({
            title: e.title,
            nickname: e.nickname,
            image: e.images[0],
            address: e.address,
            review: e.review,
            time: e.createdAt.toLocaleDateString("ko-KR"),
            _id: e._id,
        }))
        res.json({ result: true, message: "success", stores });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

export default {
    postlike,
    getAlluser,
    deletelike,
    postStorelike,
    getAllstoreuser,
    deleteStorelike,
    getMystore,
};
