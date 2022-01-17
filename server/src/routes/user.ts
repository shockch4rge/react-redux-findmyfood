import users from "../api/users/UserController";
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
        uri: "/login/:email&:password",
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
    {
        uri: "/user/:id/password",
        method: "put",
        proc: users.updatePassword
    }
] as RouteSchema[];
