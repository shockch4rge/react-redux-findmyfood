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
] as RouteSchema[];
