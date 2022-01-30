import api from "./api";
import { ReviewData } from "../../models/Review";
import { cacher } from "../../utilities/cacher";

const reviews = api.injectEndpoints({
    overrideExisting: false,

    endpoints: builder => ({
        getRestaurantReviews: builder.query<ReviewData[], string>({
            query: restaurantId => ({
                url: `/reviews/${restaurantId}`,
                method: "get",
            }),
            providesTags: cacher.providesList("Reviews"),
        }),

        getReview: builder.query<ReviewData, string>({
            query: id => ({
                url: `/review/${id}`,
                method: "get",
            }),

            providesTags: cacher.cacheByIdArg("Reviews"),
        }),

        getReviewByUserAndRestaurantId: builder.query<
            ReviewData,
            { userId: string; restaurantId: string }
        >({
            query: ({ userId, restaurantId }) => ({
                url: `/review/user/${userId}/restaurant/${restaurantId}`,
                method: "get",
            }),

            providesTags: review =>
                review ? [{ type: "Reviews", id: review.id }] : [{ type: "Reviews" }],
        }),

        addReview: builder.mutation<void, Omit<ReviewData, "id" | "isEdited">>({
            query: review => ({
                url: `/review`,
                method: "post",
                body: review,
            }),

            invalidatesTags: ["Restaurants", ...cacher.invalidatesList("Reviews")()],
        }),

        editReview: builder.mutation<ReviewData, Omit<ReviewData, "userId" | "restaurantId">>({
            query: edited => ({
                url: `/review/${edited.id}`,
                method: "post",
                body: {
                    content: edited.content,
                    title: edited.title,
                    isEdited: edited.isEdited,
                    rating: edited.rating,
                    timestamp: edited.timestamp,
                } as Omit<ReviewData, "id" | "userId" | "restaurantId">,
            }),

            invalidatesTags: ["Restaurants", ...cacher.invalidatesList("Reviews")()],
        }),

        deleteReview: builder.mutation<void, string>({
            query: id => ({
                url: `/review/${id}`,
                method: "delete",
            }),

            invalidatesTags: ["Restaurants", ...cacher.invalidatesList("Reviews")()],
        }),
    }),
});

export const {
    useAddReviewMutation,
    useDeleteReviewMutation,
    useEditReviewMutation,
    useGetRestaurantReviewsQuery, 
    useGetReviewQuery,
    useLazyGetReviewByUserAndRestaurantIdQuery,
} = reviews;
