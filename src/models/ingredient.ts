import mongoose, { Schema, Document } from "mongoose";
import { IIngredient } from "../interfaces/ingredient";

const ingredientSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
export default mongoose.model<IIngredient & Document>(
  "ingredients",
  ingredientSchema
);

