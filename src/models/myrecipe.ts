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
        ingredients: {
            type: Array,
            default: []
        },
        brief_description: {
            type: String
        },
        myrecipeId: {
            type: mongoose.Types.ObjectId
        },
        userId: {
            type: mongoose.Types.ObjectId
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
