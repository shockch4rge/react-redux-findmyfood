import { ReviewData } from "../../models/Review";
import api from "./api";

const reviews = api.injectEndpoints({
    overrideExisting: false,

    endpoints: builder => ({
        getRestaurantReviews: builder.query<ReviewData[], string>({
            query: restaurantId => ({
                url: `/reviews/${restaurantId}`,
                method: "get",
            }),
        }),

        getReview: builder.query<ReviewData, string>({
            query: id => ({
                url: `/review/${id}`,
                method: "get",
            }),
        }),

        deleteReview: builder.mutation<void, string>({
            query: id => ({
                url: `/review/${id}`,
                method: "delete",
            }),
        }),

        addReview: builder.mutation<void, Omit<ReviewData, "id" | "isEdited">>({
            query: review => ({
                url: `/review`,
                method: "post",
                body: review,
            }),
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
        }),
    }),
});

export const {
    useAddReviewMutation,
    useDeleteReviewMutation,
    useEditReviewMutation,
    useGetRestaurantReviewsQuery,
    useGetReviewQuery,
} = reviews;
