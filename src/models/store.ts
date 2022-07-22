import mongoose, { Schema, Document } from "mongoose";
import { IStore } from "../interfaces/store";

const MyStoreSchema: Schema = new Schema(
    {
        title: {
            type: String
        },
        image: {
            type: String
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

MyStoreSchema.virtual("MystoreId").get(function () {
    return this._id.toHexString();
});
MyStoreSchema.set("toJSON", {
    virtuals: true
});

export default mongoose.model<IStore & Document>("Mystore", MyStoreSchema);
