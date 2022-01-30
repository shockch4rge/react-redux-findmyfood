import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cacher } from "../../utilities/cacher";
import config from "../../config.json";

// initialize an empty api service that we'll inject endpoints into later as needed
const api = createApi({
    reducerPath: "api",
    tagTypes: [...cacher.defaultTags, "Users", "Restaurants", "Reviews", "Replies", "Bookmarks"],
    baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
    endpoints: () => ({}),
});

export default api;
