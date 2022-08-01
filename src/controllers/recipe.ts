import { Request, Response } from "express";
import Recipes from "../models/recipe";
import ingredients from "../models/ingredient";
import { IIngredient } from "../interfaces/ingredient";
import HttpStatusCode from "../common/httpStatusCode";
import favorite from "../models/favorite";
import MyRecipe from "../models/myrecipe";
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
                _id: a._id
            }))
        });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
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
        })),
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

      const existsRecipe = await Recipes.findById(recipeId).exec();
      let recommend: boolean = false;

      //이전 추천 여부 확인
      if (existsRecipe!.recommender_list!.find((e) => e === userId)) {
        recommend = true;
      } else {
        recommend = false;
      }

      if (existsRecipe) {
        let imageAddress: IIngredient | null;
        let drink_info: { recipeImages: string, recipeIngredients: string }[] = [];

        for (let i = 0; i < existsRecipe!.ingredients.length; i++) {
          const [ingredientsName] = existsRecipe!.ingredients[i].split("/"); // shape of recipe ingredient  재료명/50ml
          imageAddress = await ingredients
            .findOne({ title: ingredientsName })
            .exec();
          drink_info.push({ recipeImages: imageAddress!.image, recipeIngredients: existsRecipe!.ingredients[i] });
        }

        return res.json({
          result: true,
          message: "success",
          recipeInfo: [
            {
              _id: existsRecipe._id,
              title: existsRecipe.title,
              image: existsRecipe.image,
              brief_description: existsRecipe.brief_description,
              drink_info,
              steps: existsRecipe.steps,
              alc: existsRecipe.alc,
              recommends: existsRecipe.recommends,
              categoryId: existsRecipe.categoryId,
            },
          ],
          recommend,
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

        await Recipes.updateMany({ _id: { $in: recipeId } }, { $set: { recommends: cnt + 1 }, $push: { recommender_list: userId } }).exec();
        return res.status(HttpStatusCode.CREATED).json({ result: true, message: "추천" });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
    }
};

//추천 취소하기
const undoRecommend = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;
        const { recipeId } = req.params;
        const recipe = await Recipes.findById(recipeId).exec();

        let cnt: number = recipe!.recommends!;

        await Recipes.updateMany({ _id: { $in: recipeId } }, { $set: { recommends: cnt - 1 }, $pull: { recommender_list: userId } }).exec();
        return res.status(HttpStatusCode.CREATED).json({ result: true, message: "추천취소" });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
    }
};

//레시피 검색기능
const searchRecipes = async (req: Request, res: Response) => {
    try {
        let { search } = req.params;
        search = search.toLowerCase();

        const findTitle = await Recipes.find({
            $or: [{ title: { $regex: search, $options: "i" } }]
        }).exec();

        const findDescription = await Recipes.find({
            $or: [{ brief_description: { $regex: search, $options: "i" } }],
            $nor: [{ title: { $regex: search, $options: "i" } }]
        }).exec();

        const findKeywords = await Recipes.find({
            $or: [{ keywords: { $regex: search, $options: "i" } }],
            $nor: [{ title: { $regex: search, $options: "i" } }, { brief_description: { $regex: search, $options: "i" } }]
        }).exec();

        const findAllRecipes = findTitle.concat(findDescription, findKeywords);

        return res.status(HttpStatusCode.CREATED).json({
            result: true,
            message: "success",
            newfindAllRecipes: findAllRecipes.map((e) => ({
                image: e.image,
                title: e.title,
                brief_description: e.brief_description,
                recommends: e.recommends
            }))
        });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({ result: false, message: "잘못된 요청", error });
    }
};

//추천 누른 레시피 조회
const getMyrecipe = async (req: Request, res: Response) => {
    try {
            // 제공된 레시피 + 유저가 만든 레시피  FE와 얘기해서 상세로 넘어가는 api 분할 후 사용가능
            //변수 이름과 코드들 리팩토링 반드시 필요 

            //version #1
            // const { userId } = res.locals.user;

            // const recipes = await Recipes.find({
            //   recommender_list: userId,
            // }).exec();
            // const myrecipe = await favorite
            //   .find({ userId: userId, category: "myrecipe" })
            //   .exec();

            // const temp = myrecipe.map((a) => a.myfavoritesInfo);

            // let result = [];
            // result = recipes.map((e) => ({
            //   image: e.image,
            //   title: e.title,
            //   brief_description: e.brief_description,
            //   recommends: e.recommends,
            //   _id: e._id,
            //   label: "given",
            // }));
            // let save = [];
            // save = temp.map((e: any) => ({
            //   image: e.image,
            //   title: e.title,
            //   brief_description: e.brief_description,
            //   recommends: e.favorite_count,
            //   _id: e._id,
            //   label: "custom",
            //   time: e.createdAt,
            // }));
            // result = result.concat(save);    
            // res.json({
            //   result: true,
            //   message: "success",
            //   myrecipes: result,
            // });
            
            
            //version #2
            
            const { userId } = res.locals.user;

            const recipes = await Recipes.find({
              recommender_list: userId,
            }).exec();

            const givenRecipe = recipes.map((e) => ({
              image: e.image,
              title: e.title,
              brief_description: e.brief_description,
              recommends: e.recommends,
              _id: e._id,
              label: "given",
            }));

            const myrecipe: any = await favorite.find({ userId: userId, category: "myrecipe" }).select({ myfavoritesId: 1, _id: 0 }).exec();

            let customRecipe = [];
            for (let i = 0; i < myrecipe.length; i++) {
              const temp = await MyRecipe.findOne({_id: myrecipe[i].myfavoritesId});
              customRecipe.push(temp);
            }

            customRecipe = customRecipe.map((e: any) => ({
              image: e.image,
              title: e.title,
              brief_description: e.brief_description,
              recommends: e.favorite_count,
              _id: e._id,
              label: "custom",
            }));
            
            const result = givenRecipe.concat(customRecipe);

            res.json({
              result: true,
              message: "success",
              myrecipes: result,
            });
   
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

//술과 관련된 레시피 조회
const getRelatedRecipes = async (req: Request, res: Response) => {
    try {
        const { drink } = req.params;

        const findAllRecipes = await Recipes.find({
            $or: [{ keywords: { $regex: drink, $options: "i" } }]
        }).exec();

        return res.json({
            result: true,
            message: "success",
            recipes: findAllRecipes.map((a) => ({
                image: a.image,
                title: a.title,
                brief_description: a.brief_description,
                recommends: a.recommends,
                _id: a._id
            }))
        });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

export default {
    getRecipes,
    getRecipe,
    getMostRecommendedRecipes,
    recommendRecipe,
    undoRecommend,
    searchRecipes,
    getMyrecipe,
    getRelatedRecipes
};
