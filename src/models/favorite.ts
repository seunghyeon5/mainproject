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
    category:{
        type: String
    }
});

favoriteSchema.virtual("favoriteId").get(function () {
    return this._id.toHexString();
});
favoriteSchema.set("toJSON", {
    virtuals: true
});

export default mongoose.model<IFavorite & Document>("favorite", favoriteSchema);
