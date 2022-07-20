import { Request, Response, NextFunction } from "express";
import Mystore from "../models/store";
import User from "../models/user";
import { IUser } from "../interfaces/user";
import { IStore } from "../interfaces/store";

// import { getRegExp } from "korean-regexp"; //스토어 검색 기능


//스토어 작성
const poststore = async (req: Request, res: Response) => {
    try {
        const { title, address, review } = req.body;
        const { userId, nickname } = res.locals.user;

        await Mystore.create({
            title,
            // image: (req.file as Express.MulterS3.File).location,
            // key: (req.file as Express.MulterS3.File).key,
            address,
            review,
            nickname,
            userId
        });

        const user = await User.findById({ _id: userId });
        if (!user) {
            res.json({ result: false, msg: "2" });
            return;
        }
        let num: number = user.createdposts_store;

        await User.findOneAndUpdate({ _id: userId }, { $set: { createdposts_store: ++num } });
        return res.json({ result: true });
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};

//스토어 전체목록조회
const getAllstore = async (req: Request, res: Response) => {
  try {
      const mystore: Array<IStore> = await Mystore.find().sort({ createdAt: "desc" });
      return res.json({ result: true, mystore });
  } catch (err) {
      res.json({ result: false });
      console.log(err);
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
        // console.log(userId);
        res.json({ result: true, mystore });
        return;
    } catch (err) {
        res.json({ result: false });
        console.log(err);
    }
};

//내가 쓴 스토어 삭제
const deletestore = async (req: Request, res: Response) => {
  const userId = String(res.locals.user._id);
  const { storeId } = req.params;
  const existsStore: any = await Mystore.findById(storeId);
  const user: IUser | null = await User.findById({ _id: userId });


  try {
      if (!user) {
          return res.json({ result: false, msg: "1" });
      }
      if (existsStore.userId !== userId) {
          res.json({ result: false, message: "2" });
          return;
      } else {
          await Mystore.findByIdAndDelete(storeId);
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
  poststore,
  getAllmystore,
  deletestore,
  modifystore,
};