import app from "../app";
import request from "supertest";
import mongoose from "mongoose";
import config from "../config/config";
import testdata from "./testdata";

let token = "";

beforeAll(() => {
    mongoose.Promise = Promise;
    mongoose.connect(config.mongo.url, {
        ignoreUndefined: true
    });
});

afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.disconnect(done);
});

describe("Signup test", () => {
    test("회원가입 성공시 success띄우기", async () => {
        const response = await request(app)
            .post("/api/user/signup")
            .send({ email: testdata.Email, nickname: testdata.Nick, password: testdata.Pw, confirmpassword: testdata.Pwcheck });

        expect(response.body.message).toBe("success");
    });

    test("회원가입시 중복된 이메일인 경우 msg:중복된 이메일", async () => {
        const response = await request(app)
            .post("/api/user/signup")
            .send({ email: testdata.Email, nickname: testdata.Nick, password: testdata.Pw, confirmpassword: testdata.Pwcheck });

        expect(response.body.message).toBe("중복된 이메일");
    });

    test("회원가입시 비밀번호확인란 다른경우 msg:비밀번호 불일치", async () => {
        const response = await request(app)
            .post("/api/user/signup")
            .send({ email: testdata.Email, nickname: testdata.Nick, password: testdata.Pw, confirmpassword: testdata.wrongPw });

        expect(response.body.message).toBe("비밀번호 불일치");
    });
});

describe("Login test", () => {
    test("로그인 성공시 success", async () => {
        const response = await request(app)
            .post("/api/user/login")
            .send({ email: testdata.Email, password: testdata.Pw });

        token = response.body.token;

        expect(response.body.message).toBe("success");
        expect(response.body.token).toBe(`${token}`);
    });

    test("로그인시 이메일정보가 없는 경우 msg:이메일 없음", async () => {
        const response = await request(app)
            .post("/api/user/login")
            .send({ email: testdata.wrongEmail, password: testdata.Pw });

        expect(response.body.message).toBe("이메일 없음");
    });

    test("로그인시 비밀번호가 일치하지 않는경우 msg:비밀번호 불일치", async () => {
        const response = await request(app)
            .post("/api/user/login")
            .send({ email: testdata.Email, password: testdata.wrongPw });

        expect(response.body.message).toBe("비밀번호 불일치");
    });

    test("로그인 유저정보 가져오기", async () => {
        const response = await request(app)
            .get("/api/user/me")
            .set("authorization", `Bearer ${token}`)
            .send();
        // console.log(response)
        expect(response.body.message).toBe("success");
    });

    test("토큰값이 없는 경우 메세지", async () => {
        const response = await request(app)
            .get("/api/user/me").set("authorization", ``)
            .send();

        expect(response.body.message).toBe("토큰값 에러");
    });
    test("(로그인x)로그인 유저정보 가져오기 실패시 에러메세지", async () => {
        const response = await request(app)
            .get("/api/user/me")
            .set("authorization", `Bearer`)
            .send();

        expect(response.body.message).toBe("로그인 후 사용하세요");
    });
    test("닉네임 변경", async () => {
        const response = await request(app)
            .put("/api/user/changenick")
            .set("authorization", `Bearer ${token}`)
            .send({ nickname: testdata.ChangeNick});

        expect(response.statusCode).toBe(200)
    })
    test("이미 존재하는 닉네임인 경우 400", async () => {
        const response = await request(app)
            .put("/api/user/changenick")
            .set("authorization", `Bearer ${token}`)
            .send({ nickname: testdata.nick});

        expect(response.statusCode).toBe(400)
    })
    test("비밀번호 변경", async () => {
        const response = await request(app)
            .put("/api/user/changepassword")
            .set("authorization", `Bearer ${token}`)
            .send({ password: testdata.Pw, newpassword: testdata.ChangePw });

        expect(response.statusCode).toBe(200)
    })
    test("비밀번호 변경(비밀번호 다른경우 404)", async () => {
        const response = await request(app)
            .put("/api/user/changepassword")
            .set("authorization", `Bearer ${token}`)
            .send({ password: testdata.Pw, newpassword: testdata.ChangePw });

        expect(response.statusCode).toBe(404)
    })
    test("회원탈퇴 성공시 success", async () => {
        const response = await request(app)
            .delete("/api/user/")
            .auth(testdata.Email, testdata.Pw)
            .set("authorization", `Bearer ${token}`);

        expect(response.body.message).toBe("success");
    });
});
