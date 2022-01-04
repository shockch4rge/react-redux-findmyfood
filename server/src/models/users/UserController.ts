import UserRepository from "./UserRepository";
import { Request, Response } from "express";

export default class UserController {
    public static async getUser(request: Request, response: Response) {
        const id = request.params.id;

        const result = await UserRepository.get(id);

        response.json(result);
    }

    public static async deleteUser(request: Request, response: Response) {
        const id = request.params.id;

        try {
            await UserRepository.delete(id);
            response.json();
        } catch (err) {
            response.json(err);
        }
    }

    public static async registerUser(request: Request, response: Response) {
        console.log(request.body);

        const user = request.body.user;
        const account = request.body.account;

        try {
            await UserRepository.register({ ...user }, { ...account });
            response.json({ message: "Registered user!" });
        } catch (err) {
            response.json(err);
        }
    }

    public static async loginUser(request: Request, response: Response) {
        const email = request.body.email;
        const password = request.body.password;

        try {
            const result = await UserRepository.login(email, password);
            response.json(result);
        } catch (err) {
            response.json(err);
        }
    }

    public static async updateUser(request: Request, response: Response) {
        try {
            await UserRepository.update(request.params.userId, request.body);
            response.json({ msg: "Successfully updated! " });
        } catch (err) {
            response.json(err);
        }
    }

    public static async getAllUserBookmarks(request: Request, response: Response) {
        try {
            const bookmarks = await UserRepository.getAllUserBookmarks(request.params.userId);
            response.json(bookmarks);
        } catch (err) {
            response.json(err);
        }
    }

    public static async getUserBookmark(request: Request, response: Response) {
        try {
            const bookmark = await UserRepository.getUserBookmark(
                request.params.userId,
                request.params.id
            );
            response.json(bookmark);
        } catch (err) {
            response.json(err);
        }
    }

    public static async addBookmark(request: Request, response: Response) {
        try {
            await UserRepository.addBookmark(request.body);
            response.json({ msg: "Success adding bookmark!" });
        } catch (err) {
            response.json(err);
        }
    }

    public static async deleteBookmark(request: Request, response: Response) {
        try {
            await UserRepository.deleteBookmark(request.params.bookmarkId);
        } catch (err) {
            response.json(err);
        }
    }
}
