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

describe("[POST] store", () => {
    // test("게시글 올리는 것에 성공할경우 success", async () => {
    //     const response = await request(app).post("/api/myreipce/post").set("authorization", `Bearer ${token}`).send({
    //         title: "jest test",
    //         ingredients: "jest test",
    //         brief_description:"jest test"
    //     })

    //     expect(response.body.message).toBe("success")
    // })
})

describe("[GET] store", () => {
    test("스토어 전체목록 조회", async () => {
        const response = await request(app).get("/api/mystore/post/list").set("authorization", `Bearer ${token}`).send()
        
        expect(response.statusCode).toBe(200)
    })

    test("스토어 상세조회 성공시 success", async () => {
        const response = await request(app).get("/api/myrecipe/post/" + testdata.mockstoreId).set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("success")
    })

    // test("내가 쓴 레시피 조회 성공시 success", async () => {
    //     const response = await request(app).get("/api/myrecipe/post").set("authorization", `Bearer ${token}`).send()

    //     expect(response.body.message).toBe("success")
    // })
})