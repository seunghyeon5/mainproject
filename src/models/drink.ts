import mongoose, { Schema, Document } from "mongoose";
import { IDrink } from "../interfaces/drink";

const DrinkSchema: Schema = new Schema({
    title_kor: {
        type: String
    },
    title_eng: {
        type: String
    },
    short_description: {
        type: String
    },
    flavour: {
        type: String
    },
    alc: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    categoryId: {
       // type: mongoose.Types.ObjectId,
        type: String,
        ref: "DrinkCategories",
        required: true
    }
});

DrinkSchema.virtual("DrinksId").get(function () {
    return this._id.toHexString();
});
DrinkSchema.set("toJSON", {
    virtuals: true
});

export default mongoose.model<IDrink & Document>("Drinks", DrinkSchema);
