import UserController from "../models/users/UserController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/user/:id",
        method: "get",
        proc: UserController.getUser,
    },
    {
        uri: "/user",
        method: "post",
        proc: UserController.registerUser,
    },
    {
        uri: "/user/:id",
        method: "put",
        proc: UserController.updateUser,
    },
    {
        uri: "/user/:id",
        method: "delete",
        proc: UserController.deleteUser,
    },
] as RouteSchema[];
