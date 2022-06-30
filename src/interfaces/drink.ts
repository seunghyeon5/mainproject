import mongoose from "mongoose";

export interface IDrink {
  _id?: mongoose.Types.ObjectId;
  title_kor: string;
  title_eng: string;
  flavour: string;
  alc: number;
  country: string; 
  image: string;  
  categoryId: mongoose.Types.ObjectId; 
}