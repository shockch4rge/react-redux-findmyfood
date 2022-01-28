import UserRepository from "./UserRepository";
import { Request, Response } from "express";
import User from "./User";
import fileUpload from "express-fileupload";
import path from "node:path";

export default class UserController {
    public static async getUser(request: Request, response: Response) {
        const id = request.params.id;

        const result = await UserRepository.get(id);
        response.json(User.toJSON(result));
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
        // get the file from the body
        const file = request.files!.avatar as fileUpload.UploadedFile;
        // create a new file name with the user id: image.png -> user_id.png
        const fileName = `${request.body.id}${path.extname(file.name)}`;
        // create a path to the uploads folder with the file name
        const filePath = path.join(__dirname, "../../uploads", fileName);

        try {
            await file.mv(filePath);
            await UserRepository.register({ ...request.body, avatarPath: fileName });
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
            response.json(User.toJSON(result));
        } catch (err) {
            console.log(err)
            response.status(500).send(err);
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
