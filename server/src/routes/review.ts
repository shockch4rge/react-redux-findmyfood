import reviews from "../api/reviews/ReviewController";
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
    {
        uri: "/reviews/:restaurantId",
        method: "get",
        proc: reviews.getRestaurantReviews,
    },
] as RouteSchema[];
