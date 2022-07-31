import mongoose, { Schema, Document } from "mongoose";
import { IStore } from "../interfaces/store";

const MyStoreSchema: Schema = new Schema(
    {
        title: {
            type: String
        },       
        images: {
            type: Array,
            default: [],
        },
        keys: {
            type: Array,
            default: [],
        },
        address: {
            type: String,
        },
        review: {
            type: String
        },
        userId: {
            type: String
        },
        nickname: {
            type: String
        },
        favorite_count:{
            type:Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IStore & Document>("Mystore", MyStoreSchema);
