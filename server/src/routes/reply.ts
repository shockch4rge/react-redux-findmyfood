import replies from "../models/replies/ReplyController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/reply/:id",
        method: "get",
        proc: replies.get,
    },
    {
        uri: "/reply",
        method: "post",
        proc: replies.add,
    },
    {
        uri: "/reply/:id",
        method: "put",
        proc: replies.update,
    },
    {
        uri: "/reply/:id",
        method: "delete",
        proc: replies.delete,
    },
] as RouteSchema[];