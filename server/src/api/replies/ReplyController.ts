import { Request, Response } from "express";
import ReplyRepository from "./ReplyRepository";

export default class ReplyController {
    public static async getReviewReplies(request: Request, response: Response) {
        try {
            const replies = await ReplyRepository.getReviewReplies(request.params.reviewId);
            response.json(replies);
        }
        catch (err) {
            response.json(err);
        }
    }

    public static async update(request: Request, response: Response) {
        try {
            await ReplyRepository.update(request.params.replyId, { ...request.body });
            response.json({ msg: "Reply updated!" });
        }
        catch (err) {
            response.json(err);
        }
    }

    public static async add(request: Request, response: Response) {
        try {
            await ReplyRepository.add(request.body);
            response.json({ msg: "Reply added!" });
        }
        catch (err) {
            response.json(err);
        }
    }

    public static async get(request: Request, response: Response) {
        try {
            const reply = await ReplyRepository.get(request.params.id);
            response.json(reply);
        }
        catch (err) {
            response.json(err);
        }
    }

    public static async delete(request: Request, response: Response) {
        try {
            await ReplyRepository.delete(request.params.id);
            response.json({ msg: "Reply deleted!" })
        }
        catch (err) {
            response.json(err);
        }
    }
}
