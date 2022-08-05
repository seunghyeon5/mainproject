import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "../interfaces/category";

const categorySchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export default mongoose.model<ICategory & Document>("categories", categorySchema);
