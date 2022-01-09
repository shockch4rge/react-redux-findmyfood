import reviews from "../models/reviews/ReviewController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/review/:id",
        method: "get",
        proc: reviews.get,
    },
    {
        uri: "/review",
        method: "post",
        proc: reviews.add,
    },
    {
        uri: "/review/:id",
        method: "put",
        proc: reviews.update,
    },
    {
        uri: "/review/:id",
        method: "delete",
        proc: reviews.delete,
    },
] as RouteSchema[];