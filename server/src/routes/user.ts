import users from "../models/users/UserController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/user/:id",
        method: "get",
        proc: users.getUser,
    },
    {
        uri: "/user",
        method: "post",
        proc: users.registerUser,
    },
    {
        uri: "/login",
        method: "get",
        proc: users.loginUser,
    },
    {
        uri: "/user/:id",
        method: "put",
        proc: users.updateUser,
    },
    {
        uri: "/user/:id",
        method: "delete",
        proc: users.deleteUser,
    },
] as RouteSchema[];
