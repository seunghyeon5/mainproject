import { Types } from "mongoose";

export interface IRecipe {
  _id?: Types.ObjectId;
  title: string;
  image: string;
  ingredients: Array<string>;
  steps: Array<string>;
  alc: number;
  recommender_list?: Array<Types.ObjectId>;
  recommends?: number;
  brief_description: string;
  keywords: string;
  categoryId: Types.ObjectId; 
}
