import ReplyController from "../models/replies/ReplyController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/reply/:id",
        method: "get",
        proc: ReplyController.get,
    },
    {
        uri: "/reply",
        method: "post",
        proc: ReplyController.add,
    },
    {
        uri: "/reply/:id",
        method: "put",
        proc: ReplyController.update,
    },
    {
        uri: "/reply/:id",
        method: "delete",
        proc: ReplyController.delete,
    },
] as RouteSchema[];