import { Request, Response } from "express";
import BookmarkRepository from "./BookmarkRepository";

export default class BookmarkController {
    public static async getBookmark(request: Request, response: Response) {
        const id = request.params.id;

        try {
            const bookmark = await BookmarkRepository.get(id)
            response.json(bookmark);
        }
        catch (err) {
            response.json(err);
        }
    }

    public static async addBookmark(request: Request, response: Response) {
        try {
            await BookmarkRepository.add(request.body);
            response.json({ msg: "Saved bookmark!"});
        }
        catch (err) {
            response.json(err);
        }
    }

    public static async deleteBookmark(request: Request, response: Response) {
        try {
            await BookmarkRepository.delete(request.params.id);
            response.json({ msg: "Successfully deleted bookmark!"})
        }
        catch (err) {
            response.json(err);
        }
    }
}