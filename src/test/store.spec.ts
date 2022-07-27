import app from "../app";
import request from "supertest";
import mongoose from "mongoose";
import config from "../config/config";

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

describe("[POST] store", () => {
    test("회원가입 안되어있는 경우 회원가입 시키기", async () => {
        const response = await request(app).post("/api/user/signup").send({ email: "jest@test.com", nickname: "jest", password: "jest123@", confirmpassword: "jest123@" });

        expect(response.body.message).toBe("success");
    })
    test("토큰값가져오기", async() => {
        const response = await request(app).post("/api/user/login").send({ email: "jest@test.com", password: "jest123@" });

        token = response.body.token;

        expect(response.body.message).toBe("success");
        expect(response.body.token).toBe(`${token}`);
    })
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
    test("스토어 전체목록 조회 성공시 스테이터스코드 200", async () => {
        const response = await request(app).get("/api/mystore/post/list").set("authorization", `Bearer ${token}`).send()
        
        expect(response.body.message).toBe(200)
    })

    test("스토어 상세조회 성공시 success", async () => {
        const response = await request(app).get("/api/myrecipe/post/62deb2d65ebbaba975882db1").set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("success")
    })

    // test("내가 쓴 레시피 조회 성공시 success", async () => {
    //     const response = await request(app).get("/api/myrecipe/post").set("authorization", `Bearer ${token}`).send()

    //     expect(response.body.message).toBe("success")
    // })
})

test("유저 데이터 삭제", async () => {
    const response = await request(app).delete("/api/user/").auth("jest@test.com", "jest123@").set("authorization", `Bearer ${token}`);

    expect(response.body.message).toBe("success")
});