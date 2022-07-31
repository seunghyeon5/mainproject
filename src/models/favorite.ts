import mongoose, { Schema, Document } from "mongoose";
import { IFavorite } from "../interfaces/favorite";

const favoriteSchema: Schema = new Schema({
    nickname: {
        type: String
    },
    myfavoritesId: {
        type: String
    },
    userId: {
        type: String
    },    
    category:{
        type: String
    },
    myfavoritesInfo: {
        type: String
    },   
});

export default mongoose.model<IFavorite & Document>("favorite", favoriteSchema);
