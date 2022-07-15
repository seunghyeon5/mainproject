"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../controllers/product"));
const router = express_1.default.Router();
router.post('/create/product', product_1.default.createProduct);
router.get('/get/products', product_1.default.getAllProducts);
module.exports = router;
/*import express, { Request, Response, NextFunction, Router } from "express";
import Products from "../schemas/product";

const productRouter = express.Router();

// create one
productRouter.post("/", async (req, res) => {
  // parameters are mapped as the type formations are
  const {
    country,
    make,
    price,
  }: { country: string; make: string; price: number } = req.body;

  try {
    await Products.create({ country, make, price });

    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: "fail" });
  }
});

// read all
productRouter.get("/", async (req, res) => {
  try {
    const products = await Products.find({}); // do not use "any" type!

    res.json({ message: "success", products: products });
  } catch (err) {
    res.json({ message: "fail" });
  }
});

// read one
productRouter.get("/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Products.find({ _id: productId });

    res.json({ message: "success", product: product });
  } catch (err) {
    res.json({ message: "fail" });
  }
});

// modify one
productRouter.put("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const {
    country,
    make,
    price,
  }: { country: string; make: string; price: number } = req.body;

  try {
    await Products.findOneAndUpdate({ _id: productId }, { country, make, price });

    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: "fail" });
  }
});

// delete one
productRouter.delete("/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    await Products.findOneAndDelete({ _id: productId });

    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: "fail" });
  }
});

export { productRouter };
*/ 
