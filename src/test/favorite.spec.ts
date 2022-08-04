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

describe("[POST] 로그인", () => {
    test("로그인 성공시 success", async () => {
        const response = await request(app)
            .post("/api/user/login")
            .send({ email: testdata.email, password: testdata.pw });

        token = response.body.token;

        expect(response.body.message).toBe("success");
        expect(response.body.token).toBe(`${token}`);
    });
});

describe("[POST] Favorite", () => {
    test("좋아요 누르기", async () => {
        const response = await request(app)
            .post("/api/favorite/store/" + testdata.storeId)
            .set("authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toBe(201);
    });
    test("이미 좋아요를 누른 경우 에러메세지", async () => {
        const response = await request(app)
            .post("/api/favorite/store/" + testdata.storeId)
            .set("authorization", `Bearer ${token}`)
            .send();

        expect(response.body.message).toBe("이미 좋아요를 누르셨습니다.");
    })
});

describe("[GET] Favorite", () => {
    test("좋아요 누른사람 조회", async () => {
        const response = await request(app)
            .get("/api/favorite/store/" + testdata.storeId + "/list")
            .set("authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toBe(200);
    });
    test("내가 좋아요누른 게시글 조회", async () => {
        const response = await request(app)
            .get("/api/favorite/store/getmystore")
            .set("authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toBe(200);
    });
});

describe("[DELETE] Favorite", () => {
    test("유저정보가 올바르지 않은 경우 에러메세지", async () => {
        const response = await request(app)
            .delete("/api/favorite/store/" + testdata.storeId + "/delete")
            .auth(testdata.email2, testdata.pw2)
            .set("authorization", `Bearer ${token}`)
            .send();

        expect(response.body.message).toBe("좋아요를 누르지 않았습니다.");
    })
    test("좋아요 취소하기", async () => {
        const response = await request(app)
            .delete("/api/favorite/store/" + testdata.storeId + "/delete")
            .set("authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toBe(200);
    });
});
