import mongoose, { Schema, Document } from "mongoose";
import { IMyrecipe } from "../interfaces/myrecipe";

const MyrecipeSchema: Schema = new Schema(
    {
        title: {
            type: String
        },
        image: {
            type: String
        },
        key: {
            type: String
        },
        ingredients: {
            type: Array,
            default: []
        },
        brief_description: {
            type: String
        },
        favorite_count:{
            type: Number,
            default: 0
        },
        userId: {
            type: String
        },
        nickname: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IMyrecipe & Document>("MyRecipe", MyrecipeSchema);
