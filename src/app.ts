import express from "express";
import config from "./config/config";
import helmet from "helmet";
import { connect } from "./config";
import { userRouter } from "./routes/user";
import { categoryRouter } from "./routes/category";
import { myrecipeRouter } from "./routes/myrecipe";
import { drinkRouter } from "./routes/drink";
import { recipeRouter } from "./routes/recipe";
import { favoriteRouter } from "./routes/favorite";
import { mystoreRouter } from "./routes/store";
import { commentRouter } from "./routes/comment";
import cors from "cors";

/** importing InitRouters */
/*
import { initCategoryRouter } from "./initData/category";
import { initDrinksRouter } from "./initData/drinks";
import { initDrinkRecipeRouter } from "./initData/recipe";
import { initIngredientsRouter } from "./initData/ingredient";
*/

const router = express();

/** connect DB */
connect();

/** passport for social login */
import { kakaoPassport } from "./passport/kakao";
kakaoPassport();

const port = config.server.port;

const app = express();

const allowedOrigins = [config.server.local as string, config.server.host1 as string, config.server.host2 as string, config.server.host3 as string, config.server.host4 as string];
const options: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
app.use(cors(options));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup helmet, secure headers
app.use(helmet());
app.use(helmet.contentSecurityPolicy()); //Content-Security-Policy header
app.use(helmet.xssFilter()); //X-XSS-Protection header 0 ,XSS 공격 스크립트를 비활성화 header set prevent from XSS  injection
app.use(helmet.noSniff());
//app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.hidePoweredBy());
//app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(
    helmet.frameguard({
        // prevent from clickjacking
        action: "deny"
    })
);

//Initializing DBdata
/*
app.use("/api/init/category", [initCategoryRouter]);
app.use("/api/init/drinks", [initDrinksRouter]);
app.use("/api/init/recipes", [initDrinkRecipeRouter]);
app.use("/api/init/ingredients", [initIngredientsRouter]);
*/

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
app.use("/api/comment", [commentRouter]);
// app.use("/api/seachstore". [seachstoreRoutes]);

app.get("/", (req, res) => {
    res.send("This is a test page");
});

app.listen(port, (): void => {
    console.log("Server is running");
});

// 굳이 모든 타입을 명시해 줄 필요가 없다.
// 자동으로 사용되는 인자 값들, 바로 뒤에 값이 적용되는 경우는 바로 타입이 명시되기 때문이다.

export default app;
