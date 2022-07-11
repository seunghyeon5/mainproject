import { Types } from "mongoose";

export interface IIngredient {
  _id?: Types.ObjectId;
  title: string;
  image: string;    
  category: string;  
}


