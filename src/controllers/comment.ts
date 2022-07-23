import { Request, Response, NextFunction } from "express";
import Comment from "../models/comment";
import HttpStatusCode from "../common/httpStatusCode";

//스토어에 댓글달기
const addComment = async (req: Request, res: Response) => {
    const nickname: string = res.locals.user.nickname;
    console.log(nickname);
    const { comment } = req.body;
    const { mystoreId } = req.params;
    try {
        if (!mystoreId) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ result: false, message: "잘못된 접근" });
        }
        if (comment === null || comment === "") {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ result: false, message: "댓글 입력해주세요" });
        }
        await Comment.create({
            nickname,
            comment,
            mystoreId
        });
        return res.status(HttpStatusCode.CREATED).json({ result: true, nickname, comment });
    } catch (err) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false });
        console.log(err);
    }
};
//스토어 댓글 전체조회
const getComments = async (req: Request, res: Response) => {
    const { mystoreId } = req.params;
    try {
        if (!mystoreId) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ result: false, message: "잘못된 정보" });
        }
        const getAllcomment = await Comment.find({ mystoreId }).sort({ createdAt: "desc" });
        return res.status(HttpStatusCode.OK).json({ result: true, getAllcomment });
    } catch (err) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false });
        console.log(err);
    }
};
//댓글 수정
const modifyComment = async (req: Request, res: Response) => {
    const nickname: string = res.locals.user.nickname;
    const { commentId } = req.params;
    const { comment } = req.body;
    try {
        const existUser = await Comment.findById({ _id: commentId });
        if (existUser?.nickname !== nickname) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ result: false, message: "유저정보가 다릅니다." });
        } else {
            const modifycomment = await Comment.findByIdAndUpdate({ _id: commentId }, { $set: { comment: comment } });
            return res.status(HttpStatusCode.CREATED).json({ result: true, modifycomment });
        }
    } catch (err) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false });
        console.log(err);
    }
};
//댓글 삭제
const deleteCommeent = async (req: Request, res: Response) => {
    const nickname: string = res.locals.user.nickname;
    const { commentId } = req.params;
    try {
        const existUser = await Comment.findById({ _id: commentId });
        if (existUser?.nickname !== nickname) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ result: false, message: "유저정보가 다릅니다." });
        } else {
            await Comment.findByIdAndDelete({ _id: commentId });
            return res.status(HttpStatusCode.CREATED).json({ result: true });
        }
    } catch (err) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ result: false });
        console.log(err);
    }
};

export default {
    addComment,
    getComments,
    modifyComment,
    deleteCommeent
};
