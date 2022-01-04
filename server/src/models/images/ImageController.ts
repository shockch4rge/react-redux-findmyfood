import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import path from "path";

export default class ImageController {
    public static async upload(request: Request, response: Response) {
        const file = request.files?.file as fileUpload.UploadedFile;
        const uploadPath = path.join(__dirname, "../../uploads", file.name);

        file.mv(uploadPath, err => {
            if (err) {
                console.error(`Could not move to ${uploadPath}`);
                response.status(500).send(err);
            }
        });

        response.status(200).json({ msg: "Uploaded picture!" });
    }
}
