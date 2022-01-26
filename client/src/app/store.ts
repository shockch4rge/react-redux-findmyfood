import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import dialogs from "./slices/dialogs";
import endpointTester from "./middleware/endpointTester";
import api from "./services/api";

const uiReducer = combineReducers({
    dialogs,
});

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        ui: uiReducer,
    },
    middleware: gDM => gDM().concat(endpointTester, api.middleware),
});

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;
