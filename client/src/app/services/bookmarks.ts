import api from "./api";
import { BookmarkData } from "../../models/Bookmark"

const bookmarks = api.injectEndpoints({
    endpoints: builder => ({
        getUserBookmarks: builder.query<BookmarkData[], string>({
            query: userId => ({
                url: `/bookmarks/${userId}`,
            }),
        }),


        
    })
})