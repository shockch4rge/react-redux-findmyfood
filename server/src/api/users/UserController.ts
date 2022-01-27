import UserRepository from "./UserRepository";
import { Request, Response } from "express";
import User from "./User";

export default class UserController {
    public static async getUser(request: Request, response: Response) {
        const id = request.params.id;

        const user = await UserRepository.get(id);
        response.json(User.toJSON(user));
    }

    public static async deleteUser(request: Request, response: Response) {
        const id = request.params.id;

        try {
            await UserRepository.delete(id);
            response.json({ msg: "User deleted!" });
        } catch (err) {
            response.json(err);
        }
    }

    public static async registerUser(request: Request, response: Response) {
        try {
            await UserRepository.register({ ...request.body });
            response.json({ message: "User registered!" });
        } catch (err) {
            response.json(err);
        }
    }

    public static async loginUser(request: Request, response: Response) {
        const email = request.params.email;
        const password = request.params.password;
        
        try {
            const result = await UserRepository.login(email, password);
            response.json(result);
        } catch (err) {
            response.status(500).json(err);
        }
    }

    public static async updateUser(request: Request, response: Response) {
        try {
            await UserRepository.update(request.params.userId, request.body);
            response.json({ msg: "User updated!" });
        } catch (err) {
            response.status(500).json(err);
        }
    }

    public static async updatePassword(request: Request, response: Response) {
        const userId = request.params.userId;

        try {
            await UserRepository.updatePassword(request.body.password, userId);
            response.json({ msg: `Password updated for user: ${userId}` });
        } catch (err) {
            response.json(err);
        }
    }
}
