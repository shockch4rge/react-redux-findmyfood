import bookmarks from "../api/bookmarks/BookmarkController";
import { RouteSchema } from "../RouteManager";

module.exports = [
    {
        uri: "/bookmark/:id",
        method: "get",
        proc: bookmarks.getBookmark,
    },
    {
        uri: "/bookmark",
        method: "post",
        proc: bookmarks.addBookmark,
    },
    {
        uri: "/bookmark/:id",
        method: "delete",
        proc: bookmarks.deleteBookmark,
    },
    // {
    //     uri: "/bookmarks/:userId",
    //     method: "get",
    //     proc: bookmarks.get
    // }
] as RouteSchema[];