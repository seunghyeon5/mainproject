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

describe("[POST] Comment", () => {
    test("댓글달기 성공시 success", async () => {
        const response = await request(app).post("/api/comment/" + testdata.mockstoreId + "/write").set("authorization", `Bearer ${token}`).send({ comment: "test"})

        expect(response.statusCode).toBe(201)
    })
    test("댓글이 없는 경우 에러메세지", async () => {
        const response = await request(app).post("/api/comment/" + testdata.mockstoreId + "/write").set("authorization", `Bearer ${token}`).send({ comment: ""})

        expect(response.body.message).toBe("댓글 입력해주세요")
    })
})
describe("[GET] Comment", () => {
    test("댓글 불러오기", async () => {
        const response = await request(app).get("/api/comment/" + testdata.mockstoreId + "/write/list").set("authorization", `Bearer ${token}`).send()

        expect(response.statusCode).toBe(200)
    })
})
describe("[DELETE] Comment", () => {
    test("댓글 삭제하기", async () => {
        const response = await request(app).delete("/api/comment/" + testdata.mockstoreId + "/delete")
    })
})