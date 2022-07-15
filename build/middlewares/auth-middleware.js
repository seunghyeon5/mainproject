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
exports.authMiddleware = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = String(req.headers.authorization);
    // console.log(authorization);
    const [tokentype, tokenvalue] = authorization.split(" ");
    if (tokenvalue == "null") {
        res.locals.users = null;
        next();
        return;
    }
    if (tokentype !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요 🙄"
        });
        return;
    }
    try {
        const user = jsonwebtoken_1.default.verify(tokenvalue, config_1.default.jwt.secretKey);
        user_1.default.findById(user.user).then((user) => {
            // console.log(user);
            res.locals.user = user;
            next();
            return;
        });
    }
    catch (err) {
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요"
        });
        console.log(err);
        return;
    }
});
exports.authMiddleware = authMiddleware;
