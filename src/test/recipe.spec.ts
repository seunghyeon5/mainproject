import app from "../app";
import request from "supertest";
import mongoose from "mongoose";
import config from "../config/config";
import testdata from "./testdata";

let token = "";

beforeAll(async () => {
    await mongoose.connect(config.mongo.url, {
        ignoreUndefined: true
    });
});

afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close();
});

describe("로그인", () => {
    test("로그인을 하지 않은 경우 401", async () => {
        const response = await request(app)
            .get("/api/recipe/list/detail/" + testdata.recipeId)
            .auth("", "")
            .send();

        expect(response.statusCode).toBe(401);
    });
    test("로그인 성공시 success", async () => {
        const response = await request(app).post("/api/user/login").send({ email: testdata.email, password: testdata.pw });

        token = response.body.token;

        expect(response.body.message).toBe("success");
        expect(response.body.token).toBe(`${token}`);
    });
});
describe("[POST] Recipe", () => {
    test("레시피 추천누르기 성공할시 message:추천", async () => {
        const response = await request(app)
            .put("/api/recipe/list/recommend/" + testdata.recipeId)
            .set("authorization", `Bearer ${token}`)
            .send();

        expect(response.body.message).toBe("추천");
    });
});

describe("[GET] Recipe", () => {
    test("레시피 상세조회", async () => {
        const response = await request(app)
            .get("/api/recipe/list/detail/" + testdata.recipeId)
            .set("authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toBe(200);
    });
    test("레시피 검색", async () => {
        const response = await request(app).get("/api/recipe/list/search/gin").set("authorization", `Bearer ${token}`).send();

        expect(response.statusCode).toBe(201);
    });
    test("추천누른 레시피 조회", async () => {
        const response = await request(app).get("/api/recipe/list/getrecipe").set("authorization", `Bearer ${token}`).send();

        expect(response.statusCode).toBe(200);
    });
});

describe("[DELETE] Recipe", () => {
    test("레시피 추천취소하기", async () => {
        const response = await request(app)
            .put("/api/recipe/list/undorecommend/" + testdata.recipeId)
            .set("authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toBe(201);
    });
});
