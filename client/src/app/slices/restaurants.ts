import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantData } from "../../models/Restaurant";

// #region actions
type AddRestaurant = Pick<
    RestaurantData,
    "id" | "name" | "averageRating" | "cuisine" | "description" | "address" | "telephone"
>;

type AddAllRestaurants = RestaurantData[];
// #endregion

const slice = createSlice({
    name: "restaurants",

    initialState: {
        list: [] as RestaurantData[],
        lastFetch: null as number | null,
        loading: false,
    },

    reducers: {
        allRestaurantsAdded: (state, action: PayloadAction<AddAllRestaurants>) => {
            state.list.push(...action.payload);
        },

        restaurantsRequested: state => {
            state.loading = true;
            state.lastFetch = Date.now();
        },

        restaurantsReceived: state => {
            state.loading = false;
        },

        restaurantAdded: (state, action: PayloadAction<AddRestaurant>) => {
            state.list.push({ ...action.payload } as RestaurantData);
        },
    },
});

export const { allRestaurantsAdded, restaurantAdded, restaurantsRequested } = slice.actions;

export default slice.reducer;
