import { Request, Response } from "express";
import Drinks from "../models/drink";
import HttpStatusCode from "../common/httpStatusCode";

// 전체 리스트 출력하기
const getDrinks = async (req: Request, res: Response) => {
  try {
    const drinks = await Drinks.find().exec();
    return res.json({ result: true, message: "success", drinks });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

// 주류 하나 가져오기
const getDrink = async (req: Request, res: Response) => {
  try {
    const { drinkId } = req.params;
    const drink = await Drinks.findById(drinkId).exec();

    if (drink) {
      return res.json({ result: true, message: "success", drink: [drink] });
    } else {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ result: false, message: "no exist drink" });
    }
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
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
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ result: false, message: "no exist drink" });
    }
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

export default {
  getDrinks,
  getDrink,
  getDrinksByCategory,
};
