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
const myrecipe_1 = __importDefault(require("../models/myrecipe"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config/config"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    accessKeyId: config_1.default.aws.access_key_id,
    secretAccessKey: config_1.default.aws.access_secret,
    region: config_1.default.aws.region
});
const s3 = new aws_sdk_1.default.S3();
//레시피 작성
const postrecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, ingredients, brief_description } = req.body;
        const { userId, nickname } = res.locals.user;
        //console.log("loc",(req.file as Express.MulterS3.File).location);
        //console.log("key",(req.file as Express.MulterS3.File).key);
        //console.log(JSON.stringify(req.body));
        //console.log(typeof(ingredients)); object
        yield myrecipe_1.default.create({
            title,
            image: req.file.location,
            key: req.file.key,
            ingredients,
            brief_description,
            nickname,
            userId
        });
        const user = yield user_1.default.findById({ _id: userId });
        if (!user) {
            res.json({ result: false, msg: "2" });
            return;
        }
        let num = user.createdposts;
        yield user_1.default.findOneAndUpdate({ _id: userId }, { $set: { createdposts: ++num } });
        return res.json({ result: true });
    }
    catch (err) {
        res.json({ result: false });
        console.log(err);
    }
});
//레시피 전체목록조회
const getAllrecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myrecipe = yield myrecipe_1.default.find().sort({ createdAt: "desc" });
        return res.json({ result: true, myrecipe });
    }
    catch (err) {
        res.json({ result: false });
        console.log(err);
    }
});
//레시피 상세조회
const detailrecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { myrecipeId } = req.params;
        const existsRecipe = yield myrecipe_1.default.findById(myrecipeId);
        return res.json({ result: true, existsRecipe: [existsRecipe] });
    }
    catch (err) {
        res.json({ result: false });
        console.log(err);
    }
});
//내가 쓴 레시피 조회
const getAllmyrecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = res.locals.user;
        if (!userId) {
            return res.json({ result: false, msg: "1" });
        }
        const Myrecipe = yield myrecipe_1.default.find({ userId });
        // console.log(userId);
        res.json({ result: true, Myrecipe });
        return;
    }
    catch (err) {
        res.json({ result: false });
        console.log(err);
    }
});
//내가 쓴 레시피 삭제
const deleterecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = res.locals.user;
        const { myrecipeId } = req.params;
        const existsRecipe = yield myrecipe_1.default.findById(myrecipeId);
        const user = yield user_1.default.findById({ _id: userId });
        s3.deleteObject({
            Bucket: String(config_1.default.aws.bucket),
            Key: String(existsRecipe === null || existsRecipe === void 0 ? void 0 : existsRecipe.key)
        }, (err, data) => {
            if (err) {
                throw err;
            }
        });
        if (!user) {
            return res.json({ result: false, msg: "1" });
        }
        if ((existsRecipe === null || existsRecipe === void 0 ? void 0 : existsRecipe.userId) !== userId) {
            return res.json({ result: false, message: "2" });
        }
        else {
            yield myrecipe_1.default.findByIdAndDelete(myrecipeId);
            let num = user.createdposts;
            yield user_1.default.findOneAndUpdate({ _id: userId }, { $set: { createdposts: --num } });
            return res.json({ result: true });
        }
    }
    catch (err) {
        res.json({ result: false });
        console.log(err);
    }
});
//내가 쓴 레시피 수정
const modifyrecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const { myrecipeId } = req.params;
    const { title, image, ingredients, brief_description } = req.body;
    const existsRecipe = yield myrecipe_1.default.findById(myrecipeId);
    // console.log(existsRecipe);
    try {
        if ((existsRecipe === null || existsRecipe === void 0 ? void 0 : existsRecipe.userId) !== userId) {
            console.log(userId);
            return res.json({ result: false, msg: "1" });
        }
        else {
            yield myrecipe_1.default.findByIdAndUpdate(myrecipeId, { $set: { title, image, ingredients, brief_description } });
            return res.json({ result: true, existsRecipe });
        }
    }
    catch (err) {
        res.json({ result: false });
        console.log(err);
    }
});
exports.default = { postrecipe, getAllrecipe, deleterecipe, modifyrecipe, detailrecipe, getAllmyrecipe };
