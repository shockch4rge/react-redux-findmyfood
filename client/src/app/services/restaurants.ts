import { RestaurantData } from "../../models/Restaurant";
import api from "./api";

const restaurants = api.injectEndpoints({
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
