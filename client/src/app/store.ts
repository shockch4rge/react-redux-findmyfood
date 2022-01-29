import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth";
import replyDialog from "./slices/ui/dialogs/replyDialog";
import reviewDialog from "./slices/ui/dialogs/reviewDialog";
import steps from "./slices/ui/steps";
import endpointTester from "./middleware/endpointTester";
import api from "./services/api";
import loginDialog from "./slices/ui/dialogs/loginDialog";

const dialogs = combineReducers({
    reply: replyDialog,
    review: reviewDialog,
    login: loginDialog,
});

const uiReducer = combineReducers({
    dialogs,
    steps,
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
