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
exports.googlePassport = void 0;
const user_1 = __importDefault(require("../models/user"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const config_1 = __importDefault(require("../config/config"));
const googlePassport = () => {
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.use(new passport_google_oauth2_1.Strategy({
        clientID: String(config_1.default.social.google_id),
        clientSecret: String(config_1.default.social.google_secret),
        callbackURL: String(config_1.default.social.google_url),
    }, function (accessToken, refreshToken, profile, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let email = profile._json.email;
                const user = yield user_1.default.findOne({ email: email });
                //동일한 이메일을 가졌을 때는 이미 가입중인 사용자라면 바로 로그인하도록 아니라면 신규 사용자 생성
                if (user) {
                    // user.socialId = profile.id;
                    // user.save();
                    return cb(null, user);
                }
                else {
                    const newUser = yield user_1.default.create({
                        // socialtype: "google",
                        // socialId: profile.id,
                        // profile_image: profile._json.picture,
                        nickname: profile._json.name,
                        email: email,
                    });
                    return cb(null, newUser);
                }
            }
            catch (error) {
                return cb(error);
            }
        });
    }));
};
exports.googlePassport = googlePassport;
