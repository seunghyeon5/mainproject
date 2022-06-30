import { Types } from "mongoose";

export interface ICategory {
  _id?: Types.ObjectId;
  title: string;
  image: string;    
  description: string;  
}