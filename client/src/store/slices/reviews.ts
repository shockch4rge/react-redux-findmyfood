import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewData } from "../../../../server/src/models/Review";
import { timestamp } from "../../utilities/timestamp";

// #region actions
type AddReview = ReviewData;

type DeleteReview = Pick<ReviewData, "id">;

type EditReview = Pick<ReviewData, "id" | "title" | "content" | "rating">;

type AddReviews = ReviewData[];

type RequestUserReview = Pick<ReviewData, "id" | "userId">;
// #endregion

const slice = createSlice({
    name: "reviews",

    initialState: {
        list: [] as ReviewData[],
        lastFetch: null as number | null,
        loading: false,
    },

    reducers: {
        reviewsRequestedFromRestaurant: reviews => {
            reviews.loading = true;
        },

        reviewsReceived: reviews => {
            reviews.lastFetch = Date.now();
            reviews.loading = false;
        },

        reviewsAdded: (reviews, action: PayloadAction<AddReviews>) => {
            reviews.list.push(...action.payload)
        },

        reviewAdded: (reviews, action: PayloadAction<AddReview>) => {
            reviews.list.push(action.payload);
        },

        reviewDeleted: (reviews, action: PayloadAction<DeleteReview>) => {
            const id = action.payload.id;
            const index = reviews.list.findIndex(review => review.id === id);

            if (index !== -1) {
                reviews.list.splice(index, 1);
            }
        },

        reviewEdited: (reviews, action: PayloadAction<EditReview>) => {
            const { id, title, content, rating } = action.payload;

            const index = reviews.list.findIndex(review => review.id === id);

            reviews.list[index].content = content;
            reviews.list[index].title = title;
            reviews.list[index].rating = rating;
            reviews.list[index].timestamp = timestamp();
            reviews.list[index].isEdited = true;
        },

        requestedReviewFromUser: (reviews, action: PayloadAction<RequestUserReview>) => {
            reviews.list.filter(review => review.userId === action.payload.userId);
        },
    },
});

export const {
    reviewAdded,
    reviewDeleted,
    reviewEdited,
    reviewsReceived,
    reviewsRequestedFromRestaurant,
} = slice.actions;

export default slice.reducer;
