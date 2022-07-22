import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "../interfaces/category";

const categorySchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

categorySchema.virtual("categoryId").get(function () {
  return this._id.toHexString();
});
categorySchema.set("toJSON", {
  virtuals: true
});

export default mongoose.model<ICategory & Document>(
  "categories",
  categorySchema
);
