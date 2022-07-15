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
const favorite_1 = __importDefault(require("../models/favorite"));
//마이레시피에 좋아요 누르기
const postlike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = String(res.locals.user._id);
    const nickname = String(res.locals.user.nickname);
    const { myrecipeId } = req.params;
    try {
        const existLike = yield favorite_1.default.findOne({ _id: userId, myrecipeId: myrecipeId, nickname: nickname });
        if (existLike) {
            return res.json({ result: false, msg: "이미 좋아요를 누르셨습니다." });
        }
        else {
            const favorite = yield favorite_1.default.create({
                userId,
                myrecipeId,
                nickname
            });
            res.json({ result: true, favorite });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ result: false });
    }
});
//마이레시피에 좋아요 누른사람 조회
const getAlluser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { myrecipeId } = req.params;
    try {
        const getUser = yield favorite_1.default.find({ myrecipeId });
        res.json({ result: true, getUser });
    }
    catch (err) {
        console.log(err);
        res.json({ result: false });
    }
});
//마이레시피 좋아요 취소
const deletelike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { myrecipeId } = req.params;
    const userId = String(res.locals.user._id);
    const nickname = String(res.locals.user.nickname);
    try {
        const findUser = yield favorite_1.default.findOne({ userId, myrecipeId, nickname });
        if (!findUser) {
            return res.json({ result: false, msg: "좋아요를 누르지 않았습니다." });
        }
        else {
            yield favorite_1.default.findByIdAndDelete(findUser);
            return res.json({ result: true });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ result: false });
    }
});
//내가 좋아요 누른 마이레시피 조회
const getMyrecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = String(res.locals.user._id);
    try {
        const getMyrecipe = yield favorite_1.default.find({ userId });
        res.json({ result: true, getMyrecipe });
    }
    catch (err) {
        console.log(err);
        res.json({ result: false });
    }
});
exports.default = { postlike, getAlluser, deletelike, getMyrecipe };
