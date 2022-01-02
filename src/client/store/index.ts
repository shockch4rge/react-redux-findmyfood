import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import reviewReducer from "./slices/reviews";
import userReducer from "./slices/user";
import restaurantReducer from "./slices/restaurants";
import apiMiddleware, { apiCallBegan } from "./middleware/api";

// Entities
const entityReducer = combineReducers({
    restaurants: restaurantReducer,
    reviews: reviewReducer,
    user: userReducer,
});

const rootReducer = combineReducers({
    entities: entityReducer,
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

store.dispatch(apiCallBegan({
    url: "/test",
    onSuccess: "Hey this actually worked!"
}));