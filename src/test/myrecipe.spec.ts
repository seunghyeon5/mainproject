import app from "../app";
import request from "supertest";
import mongoose from "mongoose";
import config from "../config/config";

beforeAll(async () => {
    await mongoose.connect(config.mongo.url, {
        ignoreUndefined: true
    });

    describe("[POST] signup", () => {
        test("로그인 안한경우 가입", async () => {
            request(app).post("/api/user/signup").send({email:"jest@test.com", password:"jest123@"}).expect("success")
        })
    })
    describe("[POST] login", () => {
        const agent = request.agent(app);
        beforeEach((done) => {
            agent.post("/api/user/login").send({email:"jest@test.com", password:"jest123@"}).end(done);
        })
    })
});

afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close();

    describe("[DELETE] signout", () => {
        test("테스트용 아이디 탈퇴", async () => {
            
        })
    })
});

describe("[POST] Myrecipe", () => {
    test("게시글 올리는 것에 성공할경우 success", async () => {
        const response = await request(app).post("/api/myreipce/post").send({
            title: "jest test",
            ingredients: "jest test",
            brief_description:"jest test"
        })
        expect(response.body.message).toBe("success")
    })
})

describe("[GET] Myrecipe", () => {
    test("레시피 전체목록 조회 성공시 success", async () => {
        const response = await request(app).get("/api/myrecipe/post/list").send()
        
        expect(response.body.message).toBe("success")
    })

    test("레시피 상세조회 성공시 success", async () => {
        const response = await request(app).get("/api/myrecipe/post/:myrecipeId").send()

        expect(response.body.message).toBe("success")
    })

    test("내가 쓴 레시피 조회 성공시 success", async () => {
        const response = await request(app).get("/api/myrecipe/post")
    })
})