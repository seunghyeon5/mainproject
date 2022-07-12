import { Request, Response, NextFunction } from "express";
import MyRecipe from "../models/myrecipe";
import User from "../models/user";
import { IMyrecipe } from "../interfaces/myrecipe";
import config from "../config/config";
import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: config.aws.access_key_id,
    secretAccessKey: config.aws.access_secret,
    region: config.aws.region,
  });
const s3 = new AWS.S3();



//레시피 작성
const postrecipe = async (req: Request, res: Response) => {
    const { title, ingredients, brief_description } = req.body;
    const {userId,nickname} = res.locals.user;
    //console.log("loc",(req.file as Express.MulterS3.File).location);
    //console.log("key",(req.file as Express.MulterS3.File).key);
    //console.log(JSON.stringify(req.body));       
    //console.log(typeof(ingredients)); object     
    try {
        await MyRecipe.create({
            title,
            image: (req.file as Express.MulterS3.File).location,
            key: (req.file as Express.MulterS3.File).key, 
            ingredients,
            brief_description,
            nickname,
            userId,
        });
        const user = await User.findById({ _id: userId }); 
        if(!user)
        {
            res.json({ result: false});
            return
        }
        let num: number = user.createdposts;
        
        await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts: ++num } });
        res.json({ result: true });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};



//레시피 전체목록조회
const getAllrecipe = async (req: Request, res: Response) => {
    try {
        const myrecipe: Array<IMyrecipe> = await MyRecipe.find().sort({ createdAt: "desc" });
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
    try {
    const { userId } = res.locals.user;
    const { myrecipeId } = req.params;
    const existsRecipe: any = await MyRecipe.findById(myrecipeId);
    const user:any = await User.findById({ _id: userId });

    s3.deleteObject({
        Bucket: <any>config.aws.bucket,
        Key:existsRecipe.key
    }, (err, data) => {
        if (err) { throw err; }
        console.log('s3 deleteObject ', data)
    })
    if(!user)
    {
        res.json({ result: false});
        return
    }

    let num: number = user.createdposts;

        if (existsRecipe.userId !== userId) {
            res.json({ result: false, message: "유저정보가 다릅니다" });
        } else {
            await MyRecipe.findByIdAndDelete(myrecipeId);
            await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts: --num } });
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

/*
const testrecipe = async (req: Request, res: Response) => {

    const { nickname, userId } = res.locals.user;
    let { title, brief_description,ingredients } = req.body;
    //console.log(title,userId,nickname,brief_description);
    //console.log("loc",(req.file as Express.MulterS3.File).location);
    //console.log("key",(req.file as Express.MulterS3.File).key);
    //console.log(JSON.stringify(req.body));    
    //let temp:Array<string> =[brief_description,title];
    //console.log(typeof(ingredients)); object
    
    let keys:Array<string>=[];
    let image:string="";


    
    for(let i=0;i<(req.files as Express.MulterS3.File[]).length;i++)
    {   
        if(i===0){
            image = (req.files as Express.MulterS3.File[])[i].location;
            keys.push((req.files as Express.MulterS3.File[])[i].key);
        }else{         
            keys.push((req.files as Express.MulterS3.File[])[i].key);
        }
    }
   
    try {
        await MyRecipe.create({
            title,
            image, 
            key: keys,          
            brief_description,
            nickname,
            userId,           
            ingredients
        });
        //res.json({ url: (req.file as Express.MulterS3.File).location });
        res.json({ result: true });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};
*/
