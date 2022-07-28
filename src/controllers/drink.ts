import { Request, Response } from "express";
import { IDrink } from "../interfaces/drink";
import Drinks from "../models/drink";
import HttpStatusCode from "../common/httpStatusCode";
import User from "../models/user";

// 전체 리스트 출력하기
const getDrinks = async (req: Request, res: Response) => {
    try {
        const drinks = await Drinks.find().exec();
        return res.json({ result: true, message: "success", drinks });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
    }
};

// 주류 하나 가져오기
const getDrink = async (req: Request, res: Response) => {
    try {
        const { drinkId } = req.params;
        const drink = await Drinks.findById(drinkId).exec();
        const user = res.locals.user;
        const user_id = user._id.toHexString();

        let drinks = await Drinks.findById(drinkId).exec()
        let recommend:boolean = false;
        if(drinks!.recommend_list!.find(e => e === user_id)){
            recommend = true;
        }else{
            recommend = false;
        }

        if (drink) {
            return res.json({ result: true, message: "success", drink: [drink], recommend });
        } else {
            return res.status(HttpStatusCode.NOT_FOUND).json({ result: false, message: "no exist drink" });
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
    }
};

//카테고리별 주류 가져오기
const getDrinksByCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const drink = await Drinks.find({ categoryId }).exec();

        if (drink) {
            return res.json({ result: true, message: "success", drink });
        } else {
            return res.status(HttpStatusCode.NOT_FOUND).json({ result: false, message: "no exist drink" });
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
    }
};

//술 추천누르기
const recommendDrink = async (req: Request, res: Response) => {
    try{
        const { user } = res.locals;
        const user_id = user._id.toHexString();
        const { drinkId } = req.params;
        const drink = await Drinks.findById(drinkId).exec()
        const existRecommend = await Drinks.findOne({$and: [{recommend_list: user_id}, {_id: drinkId}]})
        console.log(existRecommend)
        
        if(existRecommend){
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "이미 추천을 누르셨습니다."})
        }
        let cnt: number = drink?.recommend!;

        await Drinks.updateMany(
            { _id: { $in: drinkId}},
            { $set: {recommend: cnt + 1}, $push: {recommend_list: userId}}
        ).exec()
        return res.status(HttpStatusCode.CREATED).json({ result: true, message: "추천"})
    }catch(err){
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", err })
    }
}

//술 추천취소하기
const undoRecommend = async (req: Request, res: Response) => {
    try{
        const { user } = res.locals;
        const user_id = user._id.toHexString();
        const { drinkId } = req.params;
        const drink = await Drinks.findById(drinkId).exec();

        let cnt: number = drink?.recommend!;

        await Drinks.updateMany(
            { _id: { $in: drinkId }},
            { $set: { recommend: cnt - 1 }, $pull: { recommend_list: user_id }}
        ).exec();
        return res.status(HttpStatusCode.OK).json({ result: true, message: "추천취소"}) 
    }catch(err){
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", err})
    }
}

//추천누른 술 불러오기
const recommendlist = async (req: Request, res: Response) => {
    const { user } = res.locals;
    const user_id = user._id.toHexString();
    
    try {
        let mydrinks= await Drinks.find({ recommend_list: user_id})
        res.status(HttpStatusCode.OK).json({result: true, message: "success", mydrinks})
    }catch(err){
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", err})
    }
}

//술냉장고에 술 추가하기
const addDrink = async (req: Request, res: Response) => {
    const { userId } = res.locals.user;
    const { drinkId } = req.params;
    try {
        const user = await User.findById({ _id: userId });
        const drink = await Drinks.findById({ _id: drinkId });
        if (!drink) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ result: false, message: "없는 술 입니다." });
        }
        if (!user) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ result: false, message: "유저정보가 올바르지 않습니다." });
        } else {
            await User.findOneAndUpdate({ _id: userId }, { $push: { Drink_refrigerator: drink.title_kor as string } });
            return res.status(HttpStatusCode.CREATED).json({ result: true, message: "success", drinkId });
        }
    } catch (err) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청" });
        console.log(err);
    }
};

//술냉장고 술 삭제하기
const deleteDrink = async (req:Request, res:Response) => {
    const { userId } = res.locals.user;
    const { drinkId } = req.params;
    try {
        const user = await User.findById({ _id: userId });
        const drink = await Drinks.findById({ _id: drinkId });
        if (!drink) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ result: false, message: "없는 술 입니다." });
        }
        if (!user) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ result: false, message: "유저정보가 올바르지 않습니다." });
        } else {
            await User.findOneAndUpdate({ _id: userId }, { $pull: { Drink_refrigerator: drink.title_kor } });
            return res.status(HttpStatusCode.OK).json({ result: true });
        }
    } catch (err) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청" });
        console.log(err);
    }
}

//술냉장고 술 불러오기
const getMydrinks = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;
        let user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ result: false, message: "유저정보가 올바르지 않습니다." });
        }
        let Mydrinks = ""
        let temp: IDrink | null;
        let drink_info:{image:string,id:string}[]=[];
        for (let i = 0; i < user.Drink_refrigerator.length; i++) {
            Mydrinks = user.Drink_refrigerator[i]
            temp = await Drinks.findOne({ title_kor: Mydrinks })
            if(!(temp!._id)){
                return false
            }else{
                drink_info.push({image:temp!.image,id:(temp!._id.toString())})
            }
        }
        console.log(drink_info)
        if(user){
            res.status(HttpStatusCode.OK).json({result: true, message:"success", drink_info: drink_info})
        }else{
            return res.status(HttpStatusCode.NOT_FOUND).json({result: false, message: "없는 술 입니다."})
        }
    } catch (err) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청" });
        console.log(err);
    }
};

export default {
    getDrinks,
    getDrink,
    getDrinksByCategory,
    addDrink,
    deleteDrink,
    getMydrinks,
    recommendDrink,
    undoRecommend,
    recommendlist
};
