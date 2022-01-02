import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";

export default class UserController {
    public readonly userRepository: UserRepository;

    public constructor() {
        this.userRepository = new UserRepository();
    }

    public async getUser(request: Request, response: Response) {
        const id = request.params.id;

        try {
            const result = await this.userRepository.get(id);
            response.json(result);
        }
        catch (err) {
            response.status(503).json(err);
        }
    }

    public async deleteUser(request: Request, response: Response) {
        const id = request.params.id;

        try {
            await this.userRepository.delete(id);
            response.json();
        }
        catch (err) {
            response.status(503).json(err);
        }
    }

    public async registerUser(request: Request, response: Response) {
        const user = request.body.user;
        const account = request.body.account;

        try {
            await this.userRepository.register(
                { ...user },
                { ...account }
            );
            response.status(200).json({ message: "Registered user!" });
        }
        catch (err) {
            response.json(err);
        }
    }

    public async loginUser(request: Request, response: Response) {
        const email = request.body.email;
        const password = request.body.password;

        try {
            await this.userRepository.login(email, password);
            response.status(200);
        }
        catch (err) {
            console.log("Got error");
            response.json(err);
        }
    }
}
