import { Request, Response } from "express";
import ReplyRepository from "../repositories/ReplyRepository";

export default class ReplyController {
    public readonly replyRepository: ReplyRepository;

    public constructor() {
        this.replyRepository = new ReplyRepository();
    }

    public async getReviewReplies(request: Request, response: Response) {
        try {
            const replies = await this.replyRepository.getReviewReplies(request.params.id);
            response.json(replies);
        }
        catch (err) {
            response.json(err);
        }
    }

    public async updateReply(request: Request, response: Response) {
        try {
            await this.replyRepository.update(request.params.replyId, { ...request.body });
            response.json({ msg: "Successfully updated!" });
        }
        catch (err) {
            response.json(err);
        }
    }

    public async addReply(request: Request, response: Response) {
        console.log(request.body);
        
        try {
            await this.replyRepository.add(request.body);
            response.json({ msg: "Successfully added reply!" });
        }
        catch (err) {
            response.json(err);
        }
    }

    public async getReply(request: Request, response: Response) {
        try {
            const reply = await this.replyRepository.get(request.params.id);
            response.json(reply);
        }
        catch (err) {
            response.json(err);
        }
    }
}
