import { Request, Response } from "express";
import Recipes from "../models/recipe";
import ingredients from "../models/ingredient";
import { IIngredient } from "../interfaces/ingredient";
import HttpStatusCode from "../common/httpStatusCode";

// 전체 리스트 출력하기
const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipes.find().exec();
    return res.json({ result: true, message: "success", recipes });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

// 레시피 상세조회
const getRecipe = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;
    const { user } = res.locals;
    const user_id = (user._id).toHexString(); 
    
    let recipe = await Recipes.findById(recipeId).exec();
    let recommend:boolean = false;
    if(recipe!.recommender_list!.find(e => e === user_id)){
      recommend = true;
    }else{
      recommend = false;
    }
    
    let [ingredient] = "";
    let temp: IIngredient | null;
    let ingredient_images: Array<string> = [];

    for (let i = 0; i < recipe!.ingredients.length; i++) {
      [ingredient] = recipe!.ingredients[i].split("/");
      temp = await ingredients.findOne({ title: ingredient }).exec();
      ingredient_images.push(temp!.image);
    }

    if (recipe) {
      return res.json({
        result: true,
        message: "success",
        images: ingredient_images,        
        recipe: [recipe],
        recommend
      });
    } else {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ result: false, message: "no exist recipe" });
    }
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

//추천하기
const recommendRecipe = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const user_id = user._id.toHexString();
    const { recipeId } = req.params;
    const recipe = await Recipes.findById(recipeId).exec();

    let cnt: number = recipe!.recommends!;

    await Recipes.updateMany(
      { _id: { $in: recipeId } },
      { $set: { recommends: cnt + 1 }, $push: { recommender_list: user_id } }
    ).exec();
    return res
      .status(HttpStatusCode.CREATED)
      .json({ result: true, message: "추천" });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

//추천 취소하기
const undoRecommend = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const user_id = user._id.toHexString();
    const { recipeId } = req.params;
    const recipe = await Recipes.findById(recipeId).exec();

    let cnt: number = recipe!.recommends!;

    await Recipes.updateMany(
      { _id: { $in: recipeId } },
      { $set: { recommends: cnt - 1 }, $pull: { recommender_list: user_id } }
    ).exec();
    return res
      .status(HttpStatusCode.CREATED)
      .json({ result: true, message: "추천취소" });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

export default {
  getRecipes,
  getRecipe,
  recommendRecipe,
  undoRecommend,  
};
