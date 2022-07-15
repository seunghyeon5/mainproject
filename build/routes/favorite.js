"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteRouter = void 0;
const express_1 = __importDefault(require("express"));
const favorite_1 = __importDefault(require("../controllers/favorite"));
const auth_middleware_1 = require("../middlewares/auth-middleware");
const favoriteRouter = express_1.default.Router();
exports.favoriteRouter = favoriteRouter;
//마이레시피에 좋아요 누르기
favoriteRouter.post("/:myrecipeId", auth_middleware_1.authMiddleware, favorite_1.default.postlike);
//마이레시피 좋아요 누른사람 조회
favoriteRouter.get("/:myrecipeId/list", favorite_1.default.getAlluser);
//좋아요 취소하기
favoriteRouter.delete("/:myrecipeId/delete", auth_middleware_1.authMiddleware, favorite_1.default.deletelike);
//내가 좋아요누른 마이레시피 조회
favoriteRouter.get("/getmyrecipe", auth_middleware_1.authMiddleware, favorite_1.default.getMyrecipe);
