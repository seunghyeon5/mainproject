import { Request, Response } from "express";
import Recipes from "../models/recipe";
import ingredients from "../models/ingredient";
import { IIngredient } from "../interfaces/ingredient";
import HttpStatusCode from "../common/httpStatusCode";

// 전체 리스트 출력하기
const getRecipes = async (req: Request, res: Response) => {
  try {
    const findAllRecipes = await Recipes.find().exec();
    return res.json({
      result: true,
      message: "success",
      recipes: findAllRecipes.map((a) => ({
        image: a.image,
        title: a.title,
        brief_description: a.brief_description,
        recommends: a.recommends,
        _id: a._id,
      }))
    });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

// 레피시 추천 상위 5 
const getMostRecommendedRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipes.find().sort({ recommends: "desc" }).limit(5);
    return res.json({
      result: true,
      message: "success",
      recipes: recipes.map((a) => ({
        image: a.image,
        title: a.title,
        brief_description: a.brief_description,
        recommends: a.recommends,
        _id: a._id,
      }))
    });
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
    const { userId } = res.locals.user;

    let recipe = await Recipes.findById(recipeId).exec();
    let recommend:boolean = false;

    //이전 추천 여부 확인
    if(recipe!.recommender_list!.find(e => e === userId)){
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
    const { userId } = res.locals.user;    
    const { recipeId } = req.params;
    const recipe = await Recipes.findById(recipeId).exec();

    let cnt: number = recipe!.recommends!;

    await Recipes.updateMany(
      { _id: { $in: recipeId } },
      { $set: { recommends: cnt + 1 }, $push: { recommender_list: userId } }
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
    const { userId } = res.locals.user;    
    const { recipeId } = req.params;
    const recipe = await Recipes.findById(recipeId).exec();

    let cnt: number = recipe!.recommends!;

    await Recipes.updateMany(
      { _id: { $in: recipeId } },
      { $set: { recommends: cnt - 1 }, $pull: { recommender_list: userId } }
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

//레시피 검색기능
const searchRecipes = async (req: Request, res: Response) => {
  try {
    let { search } = req.params;
    search = search.toLowerCase();

    const findAllRecipes = await Recipes.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { keywords: { $regex: search, $options: "i" } },
        { brief_description: { $regex: search, $options: "i" } },
      ],
    }).exec();

    return res.status(HttpStatusCode.CREATED).json({
      result: true,
      message: "success",
      findAllRecipes: findAllRecipes.map((a) => ({
        image: a.image,
        title: a.title,
        brief_description: a.brief_description,
        recommends: a.recommends,
      })),
    });
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send({ result: false, message: "잘못된 요청", error });
  }
};

//추천 누른 레시피 조회
const getMyrecipe = async (req: Request, res: Response) => {
  const { user } = res.locals;
  const user_id = (user._id).toHexString(); 
  
  try {
      let myrecipes= await Recipes.find({ recommender_list: user_id})
      res.status(HttpStatusCode.OK).json({result: true, 
        message: "success", 
        myrecipes: myrecipes.map((e) => ({
          image: e.image,
          title: e.title,
          brief_description: e.brief_description
        }))
      });
  }catch(err){
      res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", err})
  }
}

export default {
  getRecipes,
  getRecipe,
  getMostRecommendedRecipes,
  recommendRecipe,
  undoRecommend,  
  searchRecipes,
  getMyrecipe,
};
