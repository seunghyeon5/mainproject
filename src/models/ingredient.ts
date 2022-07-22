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

ingredientSchema.virtual("ingredientId").get(function () {
  return this._id.toHexString();
});
ingredientSchema.set("toJSON", {
  virtuals: true
});

export default mongoose.model<IIngredient & Document>(
  "ingredients",
  ingredientSchema
);

