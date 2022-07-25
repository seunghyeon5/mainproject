import { Request, Response, NextFunction } from "express";
import Mystore from "../models/store";
import User from "../models/user";
import { IUser } from "../interfaces/user";
import { IStore } from "../interfaces/store";

import config from "../config/config";
import AWS from "aws-sdk";
import HttpStatusCode from "../common/httpStatusCode";

AWS.config.update({
    accessKeyId: config.aws.access_key_id,
    secretAccessKey: config.aws.access_secret,
    region: config.aws.region
});
const s3 = new AWS.S3();

// import { getRegExp } from "korean-regexp"; //스토어 검색 기능
const postStore = async (req: Request, res: Response) => {
    try {
        const { title, address, review } = req.body;
        const { userId, nickname } = res.locals.user;

        const images:Array<string> = [];
        const keys:Array<string> = [];

        for(let i=0;i<((req.files as Express.MulterS3.File[]).length);i++){
            images.push((req.files as Express.MulterS3.File[])[i].location);
            //keys.push((req.files as Express.MulterS3.File[])[i].key);      
           const [temp,key] =(req.files as Express.MulterS3.File[])[i].location.split("com/")
            keys.push(key);
           }   

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
            return res
            .status(HttpStatusCode.NOT_FOUND)
            .json({ result: false, message: "no exist user" });
        }
        let num: number = user.createdposts_store;

        await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts_store: ++num } });
        return res.json({ result: true, message: "success" });
    } catch (error) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .send({ result: false, message: "잘못된 요청", error });
    }
};

//스토어 전체목록조회
const getAllstore = async (req: Request, res: Response) => {
  try {
      const mystore: Array<IStore> = await Mystore.find().sort({ createdAt: "desc" });
      return res.json({ result: true, mystore });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
}
};

//스토어 상세조회
const detailstore = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const existsStore: IStore | null = await Mystore.findById(storeId);
    return res.json({ result: true, existsStore: [existsStore] });
  } catch (err) {
      res.json({ result: false });
      console.log(err);
  }
};



//내가 쓴 스토어 조회 // 스토어 빈배열로 보내기 // 더미 데이터 보내기 s3 aws
const getAllmystore = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;
        
        if (!userId) {
            return res.json({ result: false, msg: "1" });
        }
        const mystore = await Mystore.find({ userId });
        
        res.json({ result: true, mystore });
        return;
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};

//내가 쓴 스토어 삭제
const deletestore = async (req: Request, res: Response) => {
    try {
  const {userId} = res.locals.user;
  const { mystoreId } = req.params;
 
  const existsStore: any = await Mystore.findById({_id:mystoreId});
  const user: IUser | null = await User.findById({ _id: userId });
  
  for(let i=0;i<existsStore.images.length;i++){
    const [temp,key] =existsStore?.images[i].split("com/");    
  
   
    s3.deleteObject(
        {
            Bucket: config.aws.bucket as string,
            Key:key
        },
        (err, data) => {
            if (err) {
                throw err;
            }
        }
    )
    
  }  
      if (!user) {
          return res.json({ result: false, msg: "1" });
      }
      if (existsStore.userId !== userId) {
          res.json({ result: false, message: "2" });
          return;
      } else {
          await Mystore.findByIdAndDelete(mystoreId);
          let num: number = user.createdposts_store;
          await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts_store: --num } });
          return res.json({ result: true });
      }
  } catch (err) {
      res.json({ result: false });
      console.log(err);
  }
};

//내가 쓴 스토어 수정
const modifystore = async (req: Request, res: Response) => {
  const userId = String(res.locals.user.userId);
  const { storeId } = req.params;
  const { title, address, review } = req.body;
  const existsStore: IStore | null = await Mystore.findById(storeId);
 

  try {
      if (existsStore?.userId !== userId) {
          return res.json({ result: false, msg: "1" });
      } else {
          await Mystore.findByIdAndUpdate(storeId, { $set: { title, address, review } });
          return res.json({ result: true, existsStore });
      }
  } catch (err) {
      res.json({ result: false });
      console.log(err);
  }
};

export default {
  getAllstore,
  detailstore,  
  postStore,
  getAllmystore,
  deletestore,
  modifystore,
};