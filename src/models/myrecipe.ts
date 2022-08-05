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
        steps: {
            type: Array,
            default: []
        },
        favorite_count: {
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

MyrecipeSchema.virtual("MyrecipeId").get(function () {
    return this._id.toHexString();
});
MyrecipeSchema.set("toJSON", {
    virtuals: true
});

export default mongoose.model<IMyrecipe & Document>("MyRecipe", MyrecipeSchema);
