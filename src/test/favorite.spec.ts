import app from "../app";
import request from "supertest";
import mongoose from "mongoose";
import config from "../config/config";
import testdata from "./testdata"

let token = ""

beforeAll(async () => {
    await mongoose.connect(config.mongo.url, {
        ignoreUndefined: true
    });
});

afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close();
});

describe("[POST] 로그인", () => {
    test("로그인 성공시 success", async () => {
        const response = await request(app).post("/api/user/login").send({ email: testdata.email, password: testdata.pw });

        token = response.body.token;

        expect(response.body.message).toBe("success");
        expect(response.body.token).toBe(`${token}`);
    });
})

describe("[POST] Favorite", () => {
    test("좋아요 누르기" , async () => {
        const response = await request(app).post("/api/favorite/store/" + testdata.mockstoreId).set("authorization", `Bearer ${token}`).send()

        expect(response.statusCode).toBe(201)
    })
})

describe("[GET] Favorite", () => {
    test("좋아요 누른사람 조회", async () => {
        const response = await request(app).get("/api/favorite/store/" + testdata.mockstoreId + "/list").set("authorization", `Bearer ${token}`).send()

        expect(response.statusCode).toBe(200)
    })
    test("내가 좋아요누른 게시글 조회", async () => {
        const response = await request(app).get("/api/favorite/store/getmystore").set("authorization", `Bearer ${token}`).send()

        expect(response.statusCode).toBe(200)
    })
})

describe("[DELETE] Favorite", () => {
    test("좋아요 취소하기", async () => {
        const response = await request(app).delete("/api/favorite/store/" + testdata.mockstoreId + "/delete").set("authorization", `Bearer ${token}`).send()

        expect(response.statusCode).toBe(200)
    })
})