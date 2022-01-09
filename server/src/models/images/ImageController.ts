import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";
import ImageRepository from "./ImageRepository";

export default class ImageController {
    public static async getImage(request: Request, response: Response) {
        try {
            const fileName = await ImageRepository.get(request.params.userId);
            response.json({ path: `/static/${fileName}` });
        } 
        catch (err) {
            response.json(err);
            return;
        }
    }

    public static async upload(request: Request, response: Response) {
        const userId = request.body.userId;
        const file = request.files?.file as fileUpload.UploadedFile;

        // replace the file name with the user id
        // e.g image.png -> user_id.png
        const fileName = `${userId}${path.extname(file.name)}`;
        const filePath = path.join(__dirname, "../../uploads", fileName);

        try {
            // move the file to the /uploads folder
            await file.mv(filePath);
            await ImageRepository.add(request.body.userId, fileName);
        } 
        catch (err) {
            response.status(500).json(err);
        }

        response.status(200).json({ msg: "Uploaded picture!" });
    }

    public static async delete(request: Request, response: Response) {
        const userId = request.params.userId;
        let fileName: string;

        try {
            fileName = (await ImageRepository.get(userId))["avatar_path"];
        } 
        catch (err) {
            response.json(err);
            return;
        }

        const filePath = path.join(__dirname, "../../uploads", fileName);

        try {
            fs.unlink(filePath, err => console.error(err));
            await ImageRepository.delete(userId);
        } 
        catch (err) {
            console.error("Could not delete file!");
            response.status(500).json(err);
            return;
        }

        response.json({ msg: "Deleted image!" });
    }
}
