import mongoose, { Schema, Document } from "mongoose";
import { IComment } from "../interfaces/comment";

const commentSchema: Schema = new Schema(
    {
        nickname: {
            type: String,
            require: true
        },
        mystoreId: {
            type: String
        },
        comment: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IComment & Document>("Comment", commentSchema);
