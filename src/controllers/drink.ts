import { Request, Response } from "express";
//import moment from "moment";
import Drinks from "../models/drink";
import { IDrink } from "../interfaces/drink";

// 전체 리스트 출력하기
const getDrinks = async (req: Request, res: Response) => {
  try {
    const drinks: IDrink = await Drinks.find().lean();

    res.json({ message: "success", drinks });
  } catch (error) {
    res.status(400).send({ message: "fail", error });
  }
};

// 주류 하나 가져오기
const getDrink = async (req: Request, res: Response) => {
  try {
    const { drinkId } = req.params;
    const drink: IDrink = await Drinks.findById(drinkId).lean();

    if (drink) {
      res.json({ message: "success", drink });
    } else {
      res.status(406).send({ message: "fail", error: "no exist drink" });
    }
  } catch (error) {
    res.status(400).send({ message: "fail", error });
  }
};
const getDrinksByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const drink: IDrink = await Drinks.find({ categoryId: categoryId }).lean();

    if (drink) {
      res.json({ message: "success", drink });
    } else {
      res.status(406).send({ message: "fail", error: "no exist drink" });
    }
  } catch (error) {
    res.status(400).send({ message: "fail", error });
  }
};

export default {
  getDrinks,
  getDrink,
  getDrinksByCategory,
};
