"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myrecipeRouter = void 0;
const express_1 = __importDefault(require("express"));
const myrecipe_1 = __importDefault(require("../controllers/myrecipe"));
const auth_middleware_1 = require("../middlewares/auth-middleware");
const image_uploader_1 = require("../middlewares/image-uploader");
const myrecipeRouter = express_1.default.Router();
exports.myrecipeRouter = myrecipeRouter;
//레시피 작성
myrecipeRouter.post("/post", auth_middleware_1.authMiddleware, image_uploader_1.imageuploader.single("image"), myrecipe_1.default.postrecipe);
//레시피 전체목록 조회
myrecipeRouter.get("/post/list", myrecipe_1.default.getAllrecipe);
//내가 쓴 레시피 조회
myrecipeRouter.get("/post/getmyrecipe", auth_middleware_1.authMiddleware, myrecipe_1.default.getAllmyrecipe);
//레시피 상세조회
myrecipeRouter.get("/post/:myrecipeId", auth_middleware_1.authMiddleware, myrecipe_1.default.detailrecipe);
//레시피 삭제
myrecipeRouter.delete("/:myrecipeId/delete", auth_middleware_1.authMiddleware, myrecipe_1.default.deleterecipe);
//레시피 수정
myrecipeRouter.put("/:myrecipeId/modify", auth_middleware_1.authMiddleware, myrecipe_1.default.modifyrecipe);
//myrecipeRouter.post("/post", authMiddleware, imageuploader.array("image",6), myrecipeController.postrecipe);//multi-images
