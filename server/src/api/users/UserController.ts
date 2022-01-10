import UserRepository from "./UserRepository";
import { Request, Response } from "express";

export default class UserController {
    public static async getUser(request: Request, response: Response) {
        const id = request.params.id;

        const user = await UserRepository.get(id);
        response.json(user);
    }

    public static async deleteUser(request: Request, response: Response) {
        const id = request.params.id;

        try {
            await UserRepository.delete(id);
            response.json({ msg: "User deleted!" });
        } 
        catch (err) {
            response.json(err);
        }
    }

    public static async registerUser(request: Request, response: Response) {
        try {
            await UserRepository.register({ ...request.body.user });
            response.json({ message: "User registered!" });
        } 
        catch (err) {
            response.json(err);
        }
    }

    public static async loginUser(request: Request, response: Response) {
        const email = request.body.email;
        const password = request.body.password;

        try {
            const result = await UserRepository.login(email, password);
            response.json(result);
        } 
        catch (err) {
            response.json({ msg: (err as Error).message });
        }
    }

    public static async updateUser(request: Request, response: Response) {
        try {
            await UserRepository.update(request.params.userId, request.body);
            response.json({ msg: "User updated!" });
        } 
        catch (err) {
            response.json(err);
        }
    }
}
