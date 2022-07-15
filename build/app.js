"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import bodyParser from 'body-parser';
//import logging from './config/logging';
//importing InitRouters
/*
import { initCategoryRouter } from "./initData/category";
import { initDrinksRouter } from "./initData/drinks";
import { initDrinkRecipeRouter } from "./initData/recipe";
import { initIngredientsRouter } from "./initData/ingredient";
*/
const config_1 = __importDefault(require("./config/config"));
const product_1 = __importDefault(require("./routes/product"));
const models_1 = require("./models");
const user_1 = require("./routes/user");
const category_1 = require("./routes/category");
const myrecipe_1 = require("./routes/myrecipe");
const drink_1 = require("./routes/drink");
const recipe_1 = require("./routes/recipe");
const favorite_1 = require("./routes/favorite");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.default)();
// DB
(0, models_1.connect)();
//passport
const kakao_1 = require("./passport/kakao");
(0, kakao_1.kakaoPassport)();
const google_1 = require("./passport/google");
(0, google_1.googlePassport)();
/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    //logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.json({ message: "success" });
    res.on("finish", () => {
        /** Log the res */
        // logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
        res.json({ message: "fail" });
    });
    next();
});
const port = config_1.default.server.port;
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:3000", "http://www.b-tender.com", "https://www.b-tender.com"];
const options = {
    origin: allowedOrigins,
    credentials: true // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//Initializing DBdata
/*
app.use("/api/init/category", [initCategoryRouter]);
app.use("/api/init/drinks", [initDrinksRouter]);
app.use("/api/init/recipes", [initDrinkRecipeRouter]);
app.use("/api/init/ingredients", [initIngredientsRouter]);
*/
/** Rules of our API */
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
/** Routes go here */
router.use("/products", product_1.default);
router.use("/user", user_1.userRouter);
/** Error handling */
router.use((req, res, next) => {
    const error = new Error("Not found");
    res.status(404).json({
        message: error.message
    });
});
// APIs
app.use("/api/product", [product_1.default]);
app.use("/api/user", [user_1.userRouter]);
app.use("/api/category", [category_1.categoryRouter]);
app.use("/api/myrecipe", [myrecipe_1.myrecipeRouter]);
app.use("/api/drink", [drink_1.drinkRouter]);
app.use("/api/recipe", [recipe_1.recipeRouter]);
app.use("/api/favorite", [favorite_1.favoriteRouter]);
app.get("/", (req, res) => {
    res.send("This is a test page");
});
app.listen(port, () => {
    console.log("Server is running");
});
/*
import express, {Application, Request, Response, NextFunction} from 'express';

import { productRouter } from './routes/product'
import { connect } from './schemas/index';

const port = 8080;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// APIs
app.use("/api/product", [productRouter]);
app.get('/', (req, res) =>{
  res.send('질럿질럿질럿')
});

app.listen(port, (): void => {
  console.log("Server is running");
});
*/
// 굳이 모든 타입을 명시해 줄 필요가 없다.
// 자동으로 사용되는 인자 값들, 바로 뒤에 값이 적용되는 경우는 바로 타입이 명시되기 때문이다.
