"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kakaoPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const KakaoStrategy = require("passport-kakao").Strategy;
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config/config"));
const kakaoPassport = () => {
    passport_1.default.use(new KakaoStrategy({
        clientID: config_1.default.social.kakao_id,
        callbackURL: config_1.default.social.kakao_url // 카카오 로그인 Redirect URI 경로
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let email = profile._json.kakao_account.email;
            const existUser = yield user_1.default.findOne({
                // 카카오 플랫폼에서 로그인 했고 이메일이 일치하는경우
                //email: profile._json.kakao_account_email
                email: email
            });
            //console.log(email);
            //console.log(existUser);
            // 이미 가입된 카카오 프로필이면 성공
            if (existUser) {
                done(null, existUser); // 로그인 인증 완료
            }
            else {
                const newUser = yield user_1.default.create({
                    //email: profile._json.kakao_account_email,
                    email: email,
                    nickname: profile.username
                });
                done(null, newUser); // 회원가입하고 로그인 인증 완료
                return;
            }
        }
        catch (err) {
            console.log(err);
            done(err);
        }
    })));
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
};
exports.kakaoPassport = kakaoPassport;
