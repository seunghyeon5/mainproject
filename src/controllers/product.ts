import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/product';

const createProduct = (req: Request, res: Response, next: NextFunction) => {
    let { country, make, price } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        country,
        make,
        price
    });

    return product
        .save()
        .then((result) => {
            return res.status(201).json({
                book: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllProducts = (req: Request, res: Response, next: NextFunction) => {
    Product.find()
        .exec()
        .then((products) => {
            return res.status(200).json({
                products: products,
                count: products.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createProduct, getAllProducts };