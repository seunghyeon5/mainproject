import { Request, Response, NextFunction } from "express";
import Mystore from "../models/store";
import User from "../models/user";
import { IUser } from "../interfaces/user";
import { IStore } from "../interfaces/store";
import Favorite from "../models/favorite";
import config from "../config/config";
import AWS from "aws-sdk";
import HttpStatusCode from "../common/httpStatusCode";

AWS.config.update({
    accessKeyId: config.aws.access_key_id,
    secretAccessKey: config.aws.access_secret,
    region: config.aws.region
});
const s3 = new AWS.S3();

const postStore = async (req: Request, res: Response) => {
    try {
        const { title, address, review } = req.body;
        const { userId, nickname } = res.locals.user;

        const images: Array<string> = [];
        const keys: Array<string> = [];

        (req.files as Express.MulterS3.File[]).map((e)=>{
            images.push(e.location);
            const key = e.location.split("com/")[1];
            keys.push(key);
        })

        await Mystore.create({
            title,
            images,
            keys,
            address,
            review,
            userId,
            nickname
        });

        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ result: false, message: "no exist user" });
        }
        let num: number = user.createdposts_store;

        await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts_store: ++num } });
        return res.json({ result: true, message: "success" });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
    }
};

//스토어 전체목록조회
const getAllstore = async (req: Request, res: Response) => {
    try {
        const mystore: Array<IStore> = await Mystore.find().sort({ createdAt: "desc" });
        return res.json({ result: true, mystore });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
    }
};

//스토어 상세조회
const detailstore = async (req: Request, res: Response) => {
    try {
        const { mystoreId } = req.params;
        const existsStore: IStore | null = await Mystore.findById({ _id: mystoreId });
        if (!mystoreId) {
            res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "스토어 정보가 올바르지 않습니다" });
        }
        return res.json({ result: true, existsStore: [existsStore] });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

//내가 쓴 스토어 조회 // 스토어 빈배열로 보내기 // 더미 데이터 보내기 s3 aws
const getAllmystore = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;

        if (!userId) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ result: false, msg: "유저정보가 올바르지 않습니다." });
        }
        const mystore = await Mystore.find({ userId });

        res.json({ result: true, message: "success", mystore });
        return;
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, nessage: "잘못된 요청", error });
    }
};

//내가 쓴 스토어 삭제
const deletestore = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;
        const { mystoreId } = req.params;

        const existsStore: any = await Mystore.findById({ _id: mystoreId });
        const user: IUser | null = await User.findById({ _id: userId });

        for (let i = 0; i < existsStore.images.length; i++) {
            const [temp, key] = existsStore?.images[i].split("com/");

            s3.deleteObject(
                {
                    Bucket: config.aws.bucket as string,
                    Key: key
                },
                (err, data) => {
                    if (err) {
                        throw err;
                    }
                }
            );
        }
        if (!user) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ result: false, msg: "유저정보가 올바르지 않습니다." });
        }
        if (existsStore.userId !== userId) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({ result: false, message: "유저아이디가 올바르지 않습니다." });
            return;
        } else {
            await Mystore.findByIdAndDelete(mystoreId);
            await Favorite.deleteMany({ MystoreId: mystoreId });
            let num: number = user.createdposts_store;
            await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts_store: --num } });
            return res.json({ result: true, message: "success" });
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

//내가 쓴 스토어 수정
const modifystore = async (req: Request, res: Response) => {
    const userId = String(res.locals.user.userId);
    const { mystoreId } = req.params;
    const { title, address, review } = req.body;
    const existsStore: IStore | null = await Mystore.findById(mystoreId);

    try {
        if (existsStore?.userId !== userId) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ result: false, msg: "유저아이디가 올바르지 않습니다." });
        } else {
            await Mystore.findByIdAndUpdate(mystoreId, { $set: { title, address, review } });
            return res.json({ result: true, message: "success", existsStore });
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

export default {
    getAllstore,
    detailstore,
    postStore,
    getAllmystore,
    deletestore,
    modifystore
};
