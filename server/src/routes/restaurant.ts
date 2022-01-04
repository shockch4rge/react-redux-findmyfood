import RestaurantController from "../models/restaurants/RestaurantController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/restaurant/:id",
        method: "get",
        proc: RestaurantController.get,
    },
    // {
    //     uri: "/restaurant",
    //     method: "post",
    //     proc: RestaurantController.add,
    // },
    // {
    //     uri: "/restaurant/:id",
    //     method: "put",
    //     proc: RestaurantController.update,
    // },
    // {
    //     uri: "/restaurant/:id",
    //     method: "delete",
    //     proc: RestaurantController.delete,
    // },
] as RouteSchema[];
