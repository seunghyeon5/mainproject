import { Request, Response, NextFunction } from "express";
import Comment from "../models/comment";
import HttpStatusCode from "../common/httpStatusCode";

//스토어에 댓글달기
const addComment = async (req: Request, res: Response) => {
    const { nickname, userId } = res.locals.user;
    const { comment } = req.body;
    const { mystoreId } = req.params;
    try {
        if (!userId) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "유저정보가 올바르지 않습니다." });
        }
        if (!mystoreId) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
        }
        if (comment === null || comment === "") {
            return res.status(HttpStatusCode.NOT_IMPLEMENTED).json({ result: false, message: "댓글 입력해주세요" });
        }
        await Comment.create({
            nickname,
            comment,
            userId,
            mystoreId
        });
        return res.status(HttpStatusCode.CREATED).json({ result: true, nickname, comment });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

//스토어 댓글 전체조회
const getComments = async (req: Request, res: Response) => {
    const { mystoreId } = req.params;
    try {
        if (!mystoreId) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 접근" });
        }
        const getAllcomment = await Comment.find({ mystoreId }).sort({ createdAt: "desc" });
        return res.json({ result: true, getAllcomment });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

//댓글 삭제
const deleteCommeent = async (req: Request, res: Response) => {
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    try {
        const existUser = await Comment.findById({ _id: commentId });
        if (existUser?.userId !== userId) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "유저정보가 올바르지않습니다." });
        } else {
            await Comment.findByIdAndDelete({ _id: commentId });
            return res.status(HttpStatusCode.CREATED).json({ result: true, message: "success" });
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "잘못된 요청", error });
    }
};

export default {
    addComment,
    getComments,
    deleteCommeent
};
