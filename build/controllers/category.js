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
const category_1 = __importDefault(require("../models/category"));
// 전체 카테고리 조회
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drinkCategories = yield category_1.default.find().lean();
        res.json({ message: "success", drinkCategories });
    }
    catch (error) {
        res.status(400).send({ message: "fail", error });
    }
});
// 특정 카테고리 가져오기
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        //console.log(categoryId);
        const drinkCategory = yield category_1.default.findById(categoryId).lean();
        if (drinkCategory) {
            res.json({ message: "success", drinkCategory });
        }
        else {
            res.status(406).json({ message: "fail", error: "no exist category" });
        }
    }
    catch (error) {
        res.status(400).send({ message: "fail", error });
    }
});
exports.default = {
    getCategories,
    getCategory
};
