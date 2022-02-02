import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/auth";
import replyDialogSlice from "./slices/ui/dialogs/replyDialog";
import reviewDialogSlice from "./slices/ui/dialogs/reviewDialog";
import userDialogSlice   from "./slices/ui/dialogs/userDialog";
import endpointTester from "./middleware/endpointTester";
import api from "./services/api";
import snackSlice from "./slices/ui/snackbars/snack";

const dialogs = combineReducers({
    [replyDialogSlice.name]: replyDialogSlice.reducer,
    [reviewDialogSlice.name]: reviewDialogSlice.reducer,
    [userDialogSlice.name]: userDialogSlice.reducer,
});

const uiReducer = combineReducers({
    dialogs,
    [snackSlice.name]: snackSlice.reducer,
});

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [authSlice.name]: authSlice.reducer,
        ui: uiReducer,
    },
    middleware: gDM => gDM().concat(endpointTester, api.middleware),
});

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;
