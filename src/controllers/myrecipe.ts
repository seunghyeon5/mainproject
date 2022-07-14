import { Request, Response, NextFunction } from "express";
import MyRecipe from "../models/myrecipe";
import User from "../models/user";
import { IMyrecipe } from "../interfaces/myrecipe";
import config from "../config/config";
import AWS from "aws-sdk";
import { IUser } from "../interfaces/user";

AWS.config.update({
    accessKeyId: config.aws.access_key_id,
    secretAccessKey: config.aws.access_secret,
    region: config.aws.region
});
const s3 = new AWS.S3();

//레시피 작성
const postrecipe = async (req: Request, res: Response) => {
    try {
        const { title, ingredients, brief_description } = req.body;
        const { userId, nickname } = res.locals.user;
        //console.log("loc",(req.file as Express.MulterS3.File).location);
        //console.log("key",(req.file as Express.MulterS3.File).key);
        //console.log(JSON.stringify(req.body));
        //console.log(typeof(ingredients)); object

        await MyRecipe.create({
            title,
            image: (req.file as Express.MulterS3.File).location,
            key: (req.file as Express.MulterS3.File).key,
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
        const { myrecipeId } = req.params;
        const existsRecipe: IMyrecipe | null = await MyRecipe.findById(myrecipeId);
        return res.json({ result: true, existsRecipe: [existsRecipe] });
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
    try {
        const { userId } = res.locals.user;
        const { myrecipeId } = req.params;
        const existsRecipe: IMyrecipe | null = await MyRecipe.findById(myrecipeId);
        const user: IUser | null = await User.findById({ _id: userId });

        s3.deleteObject(
            {
                Bucket: String(config.aws.bucket),
                Key: String(existsRecipe?.key)
            },
            (err, data) => {
                if (err) {
                    throw err;
                }
            }
        );

        if (!user) {
            return res.json({ result: false, msg: "1" });
        }
        if (existsRecipe?.userId !== userId) {
            return res.json({ result: false, message: "2" });
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
    const existsRecipe: IMyrecipe | null = await MyRecipe.findById(myrecipeId);
    // console.log(existsRecipe);

    try {
        if (existsRecipe?.userId !== userId) {
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
