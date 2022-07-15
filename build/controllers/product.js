"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("../models/product"));
const createProduct = (req, res, next) => {
    let { country, make, price } = req.body;
    const product = new product_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
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
const getAllProducts = (req, res, next) => {
    product_1.default.find()
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
exports.default = { createProduct, getAllProducts };
