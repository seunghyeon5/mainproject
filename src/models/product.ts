import mongoose, { Schema } from 'mongoose';
//import logging from '../config/logging';
import IProduct from '../interfaces/product';

const ProductSchema: Schema = new Schema(
    {
        country: { type: String, required: true },
        make: { type: String, required: true },
        price: { type:Number, required: true },
    },
    {
        timestamps: true
    }
);

ProductSchema.post<IProduct>('save', function () {
    //logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

export default mongoose.model<IProduct>('Product', ProductSchema);