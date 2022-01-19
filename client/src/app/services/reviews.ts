import { ReviewData } from "../../models/Review";
import mainApi from "./mainApi";

const reviews = mainApi.injectEndpoints({
    overrideExisting: false,

    endpoints: builder => ({
        getRestaurantReviews: builder.query<ReviewData[], string>({
            query: restaurantId => ({
                url: `/review/${restaurantId}`,
                method: "get",
            }),
        }),

        getReview: builder.query<ReviewData, string>({
            query: id => ({
                url: `/review/${id}`,
                method: "get",
            }),
        }),

        deleteReview: builder.query<void, string>({
            query: id => ({
                url: `/review/${id}`,
                method: "delete",
            }),
        }),

        addReview: builder.query<void, ReviewData>({
            query: review => ({
                url: `/review`,
                method: "post",
                body: review,
            }),
        }),

        editReview: builder.query<ReviewData, Omit<ReviewData, "userId" | "restaurantId">>({
            query: edited => ({
                url: `/review/${edited.id}`,
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
    useAddReviewQuery,
    useDeleteReviewQuery,
    useEditReviewQuery,
    useGetRestaurantReviewsQuery,
    useGetReviewQuery,
} = reviews;
