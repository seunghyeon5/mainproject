import express from "express";
import storeContoller from "../controllers/store";
import { authMiddleware } from "../middlewares/auth-middleware";
import { multiimageuploader } from "../middlewares/image-uploader";

const mystoreRouter = express.Router();

// 스토어 전체 조회
mystoreRouter.get("/post/list", storeContoller.getAllstore);
// 내가 쓴 스토어 목록
mystoreRouter.get("/post/getallmystore", authMiddleware, storeContoller.getAllmystore);
// 스토어 상세조회
mystoreRouter.get("/post/:mystoreId", authMiddleware, storeContoller.detailstore);
// 스토어 게시글 작성
mystoreRouter.post("/post/storesinfo", authMiddleware, multiimageuploader.array("images", 5), storeContoller.postStore);
// 스토어 삭제하기
mystoreRouter.delete("/delete/:mystoreId", authMiddleware, storeContoller.deletestore);
// 스토어 수정
mystoreRouter.put("/:mystoreId/modify", authMiddleware, storeContoller.modifystore);

export { mystoreRouter };
