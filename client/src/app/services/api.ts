import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config.json";

// initialize an empty api service that we'll inject endpoints into later as needed
const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: config.api.baseUrl }),
    endpoints: () => ({}),
});

export default api;
