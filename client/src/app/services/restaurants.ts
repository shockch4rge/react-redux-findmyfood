import { RestaurantData } from "../../models/Restaurant";
import { cacher } from "../../utilities/cacher";
import api from "./api";

const restaurants = api.injectEndpoints({
    overrideExisting: false,

    endpoints: builder => ({
        getAllRestaurants: builder.query<RestaurantData[], void>({
            query: () => ({
                url: "/restaurant",
                method: "get",
            }),

            providesTags: cacher.providesList("Restaurants"),
        }),

        getRestaurant: builder.query<RestaurantData, string>({
            query: id => ({
                url: `/restaurant/${id}`,
                method: "get",
            }),

            providesTags: cacher.cacheByIdArg("Restaurants"),
        }),

        updateRestaurantRating: builder.mutation<void, { id: string; rating: number }>({
            query: ({ id, rating }) => ({
                url: `/restaurant/${id}/updateRating`,
                method: "put",
                body: {
                    rating,
                },
            }),

            invalidatesTags: cacher.invalidatesList("Restaurants"),
        }),
    }),
});

export const { useGetAllRestaurantsQuery, useGetRestaurantQuery, useUpdateRestaurantRatingMutation } =
    restaurants;
