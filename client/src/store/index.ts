import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import reviewReducer from "./slices/reviews";
import userReducer from "./slices/user";
import restaurantReducer from "./slices/restaurants";
import authReducer from "./slices/auth";
import apiMiddleware, { apiCallBegan } from "./middleware/api";
import replyReducer from "./slices/replies";

// Entities
const entityReducer = combineReducers({
    restaurants: restaurantReducer,
    reviews: reviewReducer,
    replies: replyReducer,
    user: userReducer,
});

const rootReducer = combineReducers({
    entities: entityReducer,
    auth: authReducer,
});

// Root state
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefault => getDefault().concat(apiMiddleware),
});

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export default store;
