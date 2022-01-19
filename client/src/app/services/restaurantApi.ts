import { RestaurantData } from "../../models/Restaurant";
import mainApi from "./mainApi";

const restaurantApi = mainApi.injectEndpoints({
    endpoints: builder => ({
        getAllRestaurants: builder.query<RestaurantData[], void>({
            query: () => ({
                url: "/restaurant",
                method: "get",
            }),
        }),

        getRestaurantById: builder.query<RestaurantData, string>({
            query: (id: string) => ({
                url: `/restaurant/${id}`,
                method: "get",
            }),
        }),
    }),
});

export const { useGetAllRestaurantsQuery, useGetRestaurantByIdQuery } = restaurantApi;
