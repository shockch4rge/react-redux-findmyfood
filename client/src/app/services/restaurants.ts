import { RestaurantData } from "../../models/Restaurant";
import mainApi from "./mainApi";

const restaurants = mainApi.injectEndpoints({
    overrideExisting: false,

    endpoints: builder => ({
        getAllRestaurants: builder.query<RestaurantData[], void>({
            query: () => ({
                url: "/restaurant",
                method: "get",
            }),
        }),

        getRestaurant: builder.query<RestaurantData, string>({
            query: id => ({
                url: `/restaurant/${id}`,
                method: "get",
            }),
        }),
    }),
});

export const { useGetAllRestaurantsQuery, useGetRestaurantQuery } = restaurants;
