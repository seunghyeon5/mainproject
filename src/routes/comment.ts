import express from "express";
import commentController from "../controllers/comment";
import { authMiddleware } from "../middlewares/auth-middleware";

const commentRouter = express.Router();
// 스토어에 댓글달기
commentRouter.post("/:mystoreId/write", authMiddleware, commentController.addComment);
// 스토어 댓글조회
commentRouter.get("/:mystoreId/write/list", commentController.getComments);
// 댓글삭제
commentRouter.delete("/:mystoreId/delete/:commentId", authMiddleware, commentController.deleteCommeent);

export { commentRouter };
