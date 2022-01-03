import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantData } from "../../models/Restaurant";

// #region actions
type RequestRestaurant = Pick<RestaurantData, "id">;

type AddRestaurant = Pick<
    RestaurantData,
    | "id"
    | "name"
    | "averageRating"
    | "cuisine"
    | "description"
    | "address"
    | "telephone"
>;
// #endregion

const slice = createSlice({
    name: "restaurants",

    initialState: {
        list: [] as RestaurantData[],
        lastFetch: null as number | null,
        loading: false,
    },

    reducers: {
        restaurantRequested: (
            restaurants,
            action: PayloadAction<RequestRestaurant>
        ) => {},

        restaurantAdded: (
            restaurants,
            action: PayloadAction<AddRestaurant>
        ) => {
            restaurants.list.push({
                ...action.payload,
            } as RestaurantData);
        },
    },
});

export const { restaurantAdded, restaurantRequested } = slice.actions;

export default slice.reducer;
