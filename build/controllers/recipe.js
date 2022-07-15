"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import moment from "moment";
const recipe_1 = __importDefault(require("../models/recipe"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
// 전체 리스트 출력하기
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipe_1.default.find().lean();
        res.json({ message: "success", recipes });
    }
    catch (error) {
        res.status(400).send({ message: "fail", error });
    }
});
// 레시피 상세조회
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recipeId } = req.params;
        let recipe = yield recipe_1.default.findById(recipeId).lean();
        let [ingredient] = "";
        let temp;
        let ingredient_images = [];
        for (let i = 0; i < recipe.ingredients.length; i++) {
            [ingredient] = recipe.ingredients[i].split("/");
            temp = yield ingredient_1.default.findOne({ title: ingredient }).lean();
            ingredient_images.push(temp.image);
        }
        //console.log(recipe);
        //console.log(ingredient_images);
        if (recipe) {
            res.json({ message: "success", images: ingredient_images, recipe: [recipe] });
        }
        else {
            res.status(406).send({ message: "fail", error: "no exist recipe" });
        }
    }
    catch (error) {
        res.status(400).send({ message: "fail", error });
    }
});
exports.default = {
    getRecipes,
    getRecipe
};
