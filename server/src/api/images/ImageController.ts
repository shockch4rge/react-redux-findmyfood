import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import fs from "fs/promises";
import path from "path";
import config from "../../../config.json";
import ImageRepository from "./ImageRepository";

export default class ImageController {
    public static async get(request: Request, response: Response) {
        try {
            const fileName = (await ImageRepository.get(request.params.userId))["avatar_path"];
            console.log(fileName);

            response.json({ path: `${config.api.baseUrl}/uploads/${fileName}` });
        } catch (err) {
            response.json(err);
            return;
        }
    }

    public static async upload(request: Request, response: Response) {
        const userId = request.params.userId;
        const file = request.files?.avatar as fileUpload.UploadedFile;

        // create a new file name with the user id
        // e.g image.png -> user_id.png
        const fileName = `${userId}${path.extname(file.name)}`;
        const filePath = path.join(__dirname, "../../uploads", fileName);

        try {
            await ImageRepository.upload(request.params.userId, fileName);
            // move the file to the /uploads folder
            await file.mv(filePath);
        } catch (err) {
            response.status(500).json(err);
        }

        response.status(200).json({ msg: "Uploaded picture!" });
    }

    public static async delete(request: Request, response: Response) {
        const userId = request.params.userId;
        let fileName: string;

        try {
            fileName = (await ImageRepository.get(userId))["avatar_path"];
        } catch (err) {
            response.json(err);
            return;
        }

        const filePath = path.join(__dirname, "../../uploads", fileName);

        try {
            await fs.unlink(filePath);
            await ImageRepository.delete(userId);
        } catch (err) {
            response.status(500).json(err);
            return;
        }

        response.json({ msg: "Deleted image!" });
    }

    public static async update(request: Request, response: Response) {
        const userId = request.params.userId;
        const file = request.files?.avatar as fileUpload.UploadedFile;
        let fileName: string;

        try {
            fileName = (await ImageRepository.get(userId))["avatar_path"];
        } catch (err) {
            response.status(500).json(err);
            return;
        }

        const filePath = path.join(__dirname, "../../uploads", fileName);

        try {
            await fs.unlink(filePath);
            await file.mv(filePath);
        } catch (err) {
            response.status(500).json(err);
            return;
        }

        response.status(200).json({ msg: "Avatar updated!" });
    }
}
