import ImageController from "../models/images/ImageController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/image",
        method: "post",
        proc: ImageController.upload,
    },
] as RouteSchema[];
