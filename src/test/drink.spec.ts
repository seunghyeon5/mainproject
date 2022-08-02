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

describe("Drink", () => {
    test("술 리스트 불러오기", async () => {
        const response = await request(app).get("/api/drink/list/all").set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("success")
    })
    test("술 하나 불러오기", async () => {
        const response = await request(app).get("/api/drink/list/" + testdata.mockdrinkId).set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("success")
    })
    test("주류가 없는 경우 에러메세지", async () => {
        const response = await request(app).get("/api/drink/list/" + testdata.mockdrinkId).set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("no exist drink")
    })
    test("술 카테고리별 주류 불러오기", async () => {
        const response = await request(app).get("/api/drink/list/category/" + testdata.mockcategoryId).set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("success")
    })
    test("술 추천 누르기", async () => {
        const response = await request(app).put("/api/drink/list/recommend/" + testdata.mockdrinkId).set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("추천")
    })
    test("추천 이미누른경우 에러메세지 받기", async () => {
        const response = await request(app).put("/api/drink/list/recommend/" + testdata.mockdrinkId).set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("이미 추천을 누르셨습니다.")
    })
    test("추천누른 술 리스트 불러오기", async () => {
        const response = await request(app).get("/api/drink/recommendlist").set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("success")
    })
    test("술 추천 취소하기", async () => {
        const response = await request(app).put("/api/drink/list/undorecommend/" + testdata.mockdrinkId).set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("추천취소")
    })
    test("술냉장고에 술 추가하기", async () => {
        const response = await request(app).post("/api/drink/list/" + testdata.mockdrinkId + "/post").set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("success")
    })
    test("술냉장고에서 이미지 불러오기", async () => {
        const response = await request(app).get("/api/drink/drinkimage").set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("success")
    })
    test("술냉장고 술 삭제하기", async () => {
        const response = await request(app).delete("/api/drink/list/" + testdata.mockdrinkId + "/delete").set("authorization", `Bearer ${token}`).send()

        expect(response.body.message).toBe("success")
    })
})