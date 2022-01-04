import ReviewController from "../models/reviews/ReviewController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/review/:id",
        method: "get",
        proc: ReviewController.get,
    },
    {
        uri: "/review",
        method: "post",
        proc: ReviewController.add,
    },
    {
        uri: "/review/:id",
        method: "put",
        proc: ReviewController.update,
    },
    {
        uri: "/review/:id",
        method: "delete",
        proc: ReviewController.delete,
    },
] as RouteSchema[];