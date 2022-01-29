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

        updateRestaurantRating: builder.mutation<void, { id: string; rating: number }>({
            query: ({ id, rating }) => ({
                url: `/restaurant/${id}/updateRating`,
                method: "put",
                body: {
                    rating,
                },
            }),
        }),
    }),
});

export const { useGetAllRestaurantsQuery, useGetRestaurantQuery, useUpdateRestaurantRatingMutation } = restaurants;
