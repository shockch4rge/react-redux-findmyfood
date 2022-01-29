import restaurants from "../api/restaurants/RestaurantController";
import { RouteSchema } from "../classes/RouteManager";

module.exports = [
    {
        uri: "/restaurant/:id",
        method: "get",
        proc: restaurants.get,
    },
    {
        uri: "/restaurant",
        method: "get",
        proc: restaurants.getAll,
    },
    {
        uri: "/restaurant",
        method: "post",
        proc: restaurants.add,
    },
    {
        uri: "/restaurant/:id/updateRating",
        method: "put",
        proc: restaurants.updateRating,
    }
] as RouteSchema[];
