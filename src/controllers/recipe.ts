import { Request, Response } from "express";
//import moment from "moment";
import Recipes from "../models/recipe";
import ingredients from "../models/ingredient";
import { IRecipe } from "../interfaces/recipe";
import { IIngredient } from "../interfaces/ingredient";

// 전체 리스트 출력하기
const getRecipes = async (req: Request, res: Response) => {
    try {
        const recipes: IRecipe = await Recipes.find().lean();

        res.json({ message: "success", recipes });
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
};

// 레시피 상세조회
const getRecipe = async (req: Request, res: Response) => {
    try {
        const { recipeId } = req.params;
        let recipe: IRecipe = await Recipes.findById(recipeId).lean();
        let [ingredient] = "";
        let temp: IIngredient;
        let ingredient_images: Array<string> = [];
        for (let i = 0; i < recipe.ingredients.length; i++) {
            [ingredient] = recipe.ingredients[i].split("/");
            temp = await ingredients.findOne({ title: ingredient }).lean();
            ingredient_images.push(temp.image);
        }
        //console.log(recipe);
        //console.log(ingredient_images);
        if (recipe) {
            res.json({ message: "success", images: ingredient_images, recipe: [recipe] });
        } else {
            res.status(406).send({ message: "fail", error: "no exist recipe" });
        }
    } catch (error) {
        res.status(400).send({ message: "fail", error });
    }
};

export default {
    getRecipes,
    getRecipe
};
