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
const joi_1 = __importDefault(require("joi"));
const user_validation = {
    user_signUp: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("req :", req.body);
        const body = req.body;
        const postUsersSchema = joi_1.default.object({
            email: joi_1.default.string()
                .required()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
            password: joi_1.default.string().required().pattern(new RegExp("^[0-9a-z]{6,}$")),
            confirmpassword: joi_1.default.string().required(),
            nickname: joi_1.default.string().required()
        });
        try {
            // 검사시작
            yield postUsersSchema.validateAsync(body);
        }
        catch (err) {
            // 유효성 검사 에러
            console.log(err);
            return res.status(400).json({
                result: false
            });
        }
        next();
    }),
    user_changenickname: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        const changeUserSchema = joi_1.default.object({
            nickname: joi_1.default.string().required()
        });
        try {
            yield changeUserSchema.validateAsync(body);
        }
        catch (err) {
            console.log(err);
            return res.json({ result: false });
        }
        next();
    }),
    user_changepassword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        const ChangeUserSchema = joi_1.default.object({
            password: joi_1.default.string().required().pattern(new RegExp("^[0-9a-z]{6,}$")),
            newpassword: joi_1.default.string().required().pattern(new RegExp("^[0-9a-z]{6,}$")) //최소 6자 이상
        });
        try {
            yield ChangeUserSchema.validateAsync(body);
        }
        catch (err) {
            console.log(err);
            return res.json({ result: false });
        }
        next();
    })
};
exports.default = user_validation;
