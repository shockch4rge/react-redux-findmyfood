import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import endpointTester from "./middleware/endpointTester";
import mainApi from "./services/mainApi";

const store = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
        auth: authReducer,
    },
    middleware: gDM => gDM().concat(endpointTester, mainApi.middleware),
});

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;
