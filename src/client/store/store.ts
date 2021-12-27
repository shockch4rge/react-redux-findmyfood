import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./entities";
import { reviewAdded } from "./slices/reviews";

const store = configureStore({
    reducer: rootReducer,
});

// store.dispatch(
//     reviewAdded({
//         title: "This is review 1",
//         restaurantId: "1",
//         userId: "1",
//         content: "LMFAO LOL",
//         rating: 4,
//     })
// );

// store.dispatch(
//     reviewAdded({
//         title: "This is not review 1",
//         restaurantId: "2",
//         userId: "2",
//         content: "LOLOLOLOLOLOL",
//         rating: 3,
//     })
// );

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export default store;
