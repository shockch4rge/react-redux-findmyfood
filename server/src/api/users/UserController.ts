import UserRepository from "./UserRepository";
import { Request, Response } from "express";
import { uuid } from "../../utilities/uuid";
import User from "./User";
import fileUpload from "express-fileupload";
import path from "node:path";
import fs from "node:fs/promises";

export default class UserController {
    public static async getUser(request: Request, response: Response) {
        const id = request.params.id;

        const result = await UserRepository.get(id);
        response.json(User.toJSON(result));
    }

    public static async deleteUser(request: Request, response: Response) {
        const id = request.params.id;

        try {
            const avatar = await UserRepository.getAvatar(id);
            console.log("avatar", avatar);
            const filePath = path.join(__dirname, "../../uploads", avatar);
            await UserRepository.delete(id);
            await fs.unlink(filePath);
            response.json({ msg: "User deleted!" });
        } catch (err) {
            response.json(err);
        }
    }

    public static async registerUser(request: Request, response: Response) {
        const id = uuid();

        const avatarFile = request.files!.avatar as fileUpload.UploadedFile;
        const fileName = `${id}${path.extname(avatarFile.name)}`;
        const filePath = path.join(__dirname, "../../uploads", fileName);

        try {
            await avatarFile.mv(filePath);
            await UserRepository.register({ id, ...request.body, avatarPath: fileName });
            response.json({ message: "User registered!" });
        } catch (err) {
            response.status(500).send((err as Error).message);
        }
    }

    public static async loginUser(request: Request, response: Response) {
        const email = request.params.email;
        const password = request.params.password;

        try {
            const result = await UserRepository.login(email, password);
            response.json(User.toJSON(result));
        } catch (err) {
            response.status(500).send((err as Error).message);
        }
    }

    public static async updateUser(request: Request, response: Response) {
        const avatarFile = request.files!.avatar as fileUpload.UploadedFile;

        const fileName = `${request.params.id}${path.extname(avatarFile.name)}`;
        const filePath = path.join(__dirname, "../../uploads", fileName);

        try {
            await fs.unlink(filePath);
            await avatarFile.mv(filePath);
        } catch (err) {
            console.log((err as Error).message);
            response.status(500).send((err as Error).message);
            return;
        }

        try {
            await UserRepository.update(request.params.id, { ...request.body, avatarPath: fileName });
            response.json({ msg: "User updated!" });
        } catch (err) {
            console.log(err);
            response.status(500).send((err as Error).message);
        }
    }

    public static async updatePassword(request: Request, response: Response) {
        const email = request.params.email;
        const password = request.body.password;

        try {
            await UserRepository.updatePassword(email, password);
            response.json({ msg: `Password updated for user: ${email}` });
        } catch (err) {
            response.status(500).send((err as Error).message);
        }
    }
}
