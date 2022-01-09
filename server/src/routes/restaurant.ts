import restaurants from "../models/restaurants/RestaurantController";
import { RouteSchema } from "../RouteManager";

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
