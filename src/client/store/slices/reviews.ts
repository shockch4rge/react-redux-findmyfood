import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewData } from "../../models/Review";
import { timestamp } from "../../utilities/timestamp";

// #region actions
type AddReview = ReviewData;

type DeleteReview = Pick<ReviewData, "id">;

type EditReview = Pick<ReviewData, "id" | "title" | "content" | "rating">;

type RequestReviews = Pick<ReviewData, "restaurantId">;

type ReceiveReviews = {
    reviews: ReviewData[];
};

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
        reviewsRequestedFromRestaurant: (
            reviews,
            action: PayloadAction<RequestReviews>
        ) => {
            reviews.loading = true;
        },

        reviewsReceived: (reviews, action: PayloadAction<ReceiveReviews>) => {
            reviews.lastFetch = Date.now();
            reviews.list = action.payload.reviews;
            reviews.loading = false;
        },

        reviewAdded: (reviews, action: PayloadAction<AddReview>) => {
            reviews.list.push({ ...action.payload } as ReviewData);
        },

        reviewDeleted: (reviews, action: PayloadAction<DeleteReview>) => {
            const { id } = action.payload;
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

        requestedReviewFromUser: (
            reviews,
            action: PayloadAction<RequestUserReview>
        ) => {
            reviews.list.filter(
                review => review.userId === action.payload.userId
            );
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