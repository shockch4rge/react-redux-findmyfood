import BookmarkController from "../models/bookmarks/BookmarkController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/bookmark/:id",
        method: "get",
        proc: BookmarkController.getBookmark,
    },
    {
        uri: "/bookmark",
        method: "post",
        proc: BookmarkController.addBookmark,
    },
    {
        uri: "/bookmark/:id",
        method: "delete",
        proc: BookmarkController.deleteBookmark,
    },
] as RouteSchema[];