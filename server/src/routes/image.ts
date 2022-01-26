import images from "../api/images/ImageController";
import { RouteSchema } from "../classes/RouteManager";

module.exports = [
    {
        uri: "/image/user/:userId",
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
        proc: images.get,
    },
    {
        uri: "/image/user/:userId",
        method: "put",
        proc: images.update,
    },
] as RouteSchema[];
