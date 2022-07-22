import mongoose, { Schema, Document } from "mongoose";
import { IRecipe } from "../interfaces/recipe";

const RecipeSchema: Schema = new Schema({
  title: {
    type: String,    
  },
  image: {
    type: String,   
  },
  ingredients: {
    type: Array,
    default: [],
  },
  steps: {
    type: Array,
    default: [],
  },
  alc: {
    type: Number,
    required: true
  },
  recommender_list: {
    type: Array,
    default: [],
  },
  recommends: {
    type: Number,
    default: 0,
  },
  brief_description: {
    type: String,
  },
  keywords: {
    type: String,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "DrinkCategories",
    required: true,
  }, 
});

RecipeSchema.virtual("RecipeId").get(function () {
  return this._id.toHexString();
});
RecipeSchema.set("toJSON", {
  virtuals: true
});

export default mongoose.model<IRecipe & Document>("Recipes", RecipeSchema);
