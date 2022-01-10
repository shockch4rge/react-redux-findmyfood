import images from "../api/images/ImageController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/image/user",
        method: "post",
        proc: images.upload,
    },
    {
        uri: "/image/user/:userId",
        method: "delete",
        proc: images.delete,
    },
    {
        uri: "/image/user/:userId",
        method: "get",
        proc: images.getImage,
    },
    {
        uri: "/image/user/:userId",
        method: "put",
        proc: images.update,
    },
] as RouteSchema[];
