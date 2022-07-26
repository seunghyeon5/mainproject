import mongoose, { Schema, Document } from "mongoose";
import { IFavorite } from "../interfaces/favorite";

const favoriteSchema: Schema = new Schema({
    nickname: {
        type: String
    },
    myrecipeId: {
        type: String
    },
    userId: {
        type: String
    },
    MystoreId:{
        type: String
    },
    drinkId: {
        type: String
    },
    category:{
        type: String
    },
    drinks: {
        type: Array
    },
    Store: {
        type: Array
    },
    Myrecipe:{
        type: Array
    }
});

export default mongoose.model<IFavorite & Document>("favorite", favoriteSchema);
