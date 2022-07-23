import express, { Application, Request, Response, NextFunction } from "express";
//import bodyParser from 'body-parser';
//import logging from './config/logging';

//importing InitRouters
/*
import { initCategoryRouter } from "./initData/category";
import { initDrinksRouter } from "./initData/drinks";
import { initDrinkRecipeRouter } from "./initData/recipe";
import { initIngredientsRouter } from "./initData/ingredient";
*/

import config from "./config/config";
import { connect } from "./models";
import { userRouter } from "./routes/user";
import { categoryRouter } from "./routes/category";
import { myrecipeRouter } from "./routes/myrecipe";
import { drinkRouter } from "./routes/drink";
import { recipeRouter } from "./routes/recipe";
import { favoriteRouter } from "./routes/favorite";
import { mystoreRouter } from "./routes/store";

import cors from "cors";

const router = express();

// DB
connect();

//passport
import { kakaoPassport } from "./passport/kakao";

kakaoPassport();

import { googlePassport } from "./passport/google";


googlePassport();

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

const port = config.server.port;

const app = express();

const allowedOrigins = [
  config.server.local as string,
  config.server.host1 as string,
  config.server.host2 as string,
  config.server.host3 as string,
  config.server.host4 as string,  
];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(options));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
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
router.use("/user", userRouter);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error("Not found");

    res.status(404).json({
        message: error.message
    });
});

// APIs
app.use("/api/user", [userRouter]);
app.use("/api/category", [categoryRouter]);
app.use("/api/myrecipe", [myrecipeRouter]);
app.use("/api/drink", [drinkRouter]);
app.use("/api/recipe", [recipeRouter]);
app.use("/api/favorite", [favoriteRouter]);
app.use("/api/mystore", [mystoreRouter]);
// app.use("/api/seachstore". [seachstoreRoutes]);

app.get("/", (req, res) => {
    res.send("This is a test page!!!!");
});

app.listen(port, (): void => {
    console.log("Server is running");
});


// 굳이 모든 타입을 명시해 줄 필요가 없다.
// 자동으로 사용되는 인자 값들, 바로 뒤에 값이 적용되는 경우는 바로 타입이 명시되기 때문이다.

export default app;