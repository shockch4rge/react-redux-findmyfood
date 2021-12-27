import { combineReducers } from "@reduxjs/toolkit";
import reviewReducer from "./slices/reviews";
import userReducer from "./slices/user";
import restaurantReducer from "./slices/restaurants"

const entities = combineReducers({
    restaurants: restaurantReducer,
    reviews: reviewReducer,
    user: userReducer,
});

export default entities;
