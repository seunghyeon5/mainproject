import mongoose from "mongoose";

export interface ICategory {
  _id?: mongoose.Types.ObjectId;
  title: string;
  image: string;    
  description: string;  
}