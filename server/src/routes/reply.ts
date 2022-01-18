import replies from "../api/replies/ReplyController";
import { RouteSchema } from "../classes/RouteManager";

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
    {
        uri: "/replies/:reviewId",
        method: "get",
        proc: replies.getReviewReplies,
    },
] as RouteSchema[];
