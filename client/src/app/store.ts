import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import endpointTester from "./middleware/endpointTester";
import api from "./services/api";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
    },
    middleware: gDM => gDM().concat(endpointTester, api.middleware),
});

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;
