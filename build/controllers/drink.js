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
//import moment from "moment";
const drink_1 = __importDefault(require("../models/drink"));
// 전체 리스트 출력하기
const getDrinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drinks = yield drink_1.default.find().lean();
        res.json({ message: "success", drinks });
    }
    catch (error) {
        res.status(400).send({ message: "fail", error });
    }
});
// 주류 하나 가져오기
const getDrink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { drinkId } = req.params;
        const drink = yield drink_1.default.findById(drinkId).lean();
        if (drink) {
            res.json({ message: "success", drink: [drink] });
        }
        else {
            res.status(406).send({ message: "fail", error: "no exist drink" });
        }
    }
    catch (error) {
        res.status(400).send({ message: "fail", error });
    }
});
const getDrinksByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const drink = yield drink_1.default.find({ categoryId: categoryId }).lean();
        if (drink) {
            res.json({ message: "success", drink });
        }
        else {
            res.status(406).send({ message: "fail", error: "no exist drink" });
        }
    }
    catch (error) {
        res.status(400).send({ message: "fail", error });
    }
});
exports.default = {
    getDrinks,
    getDrink,
    getDrinksByCategory
};
