import { Request, Response, NextFunction } from "express";
import MyRecipe from "../models/myrecipe";
import User from "../models/user";
import { IMyrecipe } from "../interfaces/myrecipe";
import config from "../config/config";
import AWS from "aws-sdk";
import { IUser } from "../interfaces/user";
import { IIngredient } from "../interfaces/ingredient"
import ingredients from "../models/ingredient";
import HttpStatusCode from "../common/httpStatusCode";

AWS.config.update({
    accessKeyId: config.aws.access_key_id,
    secretAccessKey: config.aws.access_secret,
    region: config.aws.region
});
const s3 = new AWS.S3();

//레시피 작성
const postRecipe = async (req: Request, res: Response) => {
    try {
        const { title, ingredients, brief_description, steps } = req.body;
        const { userId, nickname } = res.locals.user;        

        await MyRecipe.create({
            title,
            image: (req.file as Express.MulterS3.File).location,
            key: (req.file as Express.MulterS3.File).key,
            ingredients,
            brief_description,
            steps,
            nickname,
            userId
        });

        const user = await User.findById({ _id: userId });
        if (!user) {
            return res
            .status(HttpStatusCode.NOT_FOUND)
            .json({ result: false, message: "no exist user" });
        }
        let num: number = user.createdposts;

        await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts: ++num } });
        return res.json({ result: true, message: "success" });
    } catch (error) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .send({ result: false, message: "잘못된 요청", error });
    }
};

//레시피 전체목록조회
const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const myrecipes = await MyRecipe.find().sort({ createdAt: "desc" });
    return res.json({
      result: true,
      message: "success",
      myrecipes: myrecipes.map((a) => ({
        image: a.image,
        title: a.title,
        brief_description: a.brief_description,
        favorite_count: a.favorite_count,
        nickname: a.nickname,
        userId: a.userId,
        _id: a._id, //myrecipe id
        createdAt: a.createdAt?.toLocaleDateString("ko-KR"),
      }))
    });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

//레시피 상세조회
const detailRecipe = async (req: Request, res: Response) => {
  try {
    const { myrecipeId } = req.params;
    const existsRecipe = await MyRecipe.findById(myrecipeId);
    
    let ingredient = "";
    let temp: IIngredient | null;
    let ingredient_images: Array<string> = [];

    for (let i = 0; i < existsRecipe!.ingredients.length; i++) {
        
      ingredient = existsRecipe!.ingredients[i];      
      temp = await ingredients.findOne({ title: ingredient }).exec();     
      ingredient_images.push(temp!.image);
    }
    if (existsRecipe) {
      return res.json({
        result: true,
        message: "success",
        images: ingredient_images,
        myrecipe: [existsRecipe],
      });
    } else {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ result: false, message: "no exist myrecipe" });
    }
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

//내가 쓴 레시피 조회
const getAllMyRecipe = async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals.user;
    if (!userId) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ result: false, message: "no exist user" });
    }

    const Myrecipe = await MyRecipe.find({ userId });

    return res.json({
      result: true,
      message: "success",
      Myrecipe: Myrecipe.map((a) => ({
        image: a.image,
        title: a.title,
        brief_description: a.brief_description,
        favorite_count: a.favorite_count,
        nickname: a.nickname,
        userId: a.userId,
        _id: a._id, 
        createdAt: a.createdAt?.toLocaleDateString("ko-KR"),
      })),
    });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

//내가 쓴 레시피 삭제
const deleteRecipe = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;
        const { myrecipeId } = req.params;
        const existsRecipe: IMyrecipe | null = await MyRecipe.findById(myrecipeId);
        const user: IUser | null = await User.findById({ _id: userId });

        s3.deleteObject(
          {
            Bucket: config.aws.bucket as string,
            Key: existsRecipe?.key as string,
          },
          (err, data) => {
            if (err) {
              throw err;
            }
          }
        );

        if (!user) {
            return res
            .status(HttpStatusCode.NOT_FOUND)
            .json({ result: false, message: "no exist user" });
        }
        if (existsRecipe?.userId !== userId) {
            return res
            .status(HttpStatusCode.NOT_FOUND)
            .json({ result: false, message: "no exist user" });
        } else {
            await MyRecipe.findByIdAndDelete(myrecipeId);
            let num: number = user.createdposts;
            await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts: --num } });
            return res.json({ result: true, message: "success"});
        }
    } catch (error) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .send({ result: false, message: "잘못된 요청", error });
    }
};

export default { postRecipe, getAllRecipes, deleteRecipe, detailRecipe, getAllMyRecipe};
