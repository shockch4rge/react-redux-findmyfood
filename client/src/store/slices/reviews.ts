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
        reviewsRequestedFromRestaurant: state => {
            state.loading = true;
        },

        reviewsReceived: state => {
            state.lastFetch = Date.now();
            state.loading = false;
        },

        reviewsAdded: (state, action: PayloadAction<AddReviews>) => {
            state.list.push(...action.payload)
        },

        reviewAdded: (state, action: PayloadAction<AddReview>) => {
            state.list.push(action.payload);
        },

        reviewDeleted: (state, action: PayloadAction<DeleteReview>) => {
            const id = action.payload.id;
            const index = state.list.findIndex(review => review.id === id);

            if (index !== -1) {
                state.list.splice(index, 1);
            }
        },

        reviewEdited: (state, action: PayloadAction<EditReview>) => {
            const { id, title, content, rating } = action.payload;

            const index = state.list.findIndex(review => review.id === id);

            state.list[index].content = content;
            state.list[index].title = title;
            state.list[index].rating = rating;
            state.list[index].timestamp = timestamp();
            state.list[index].isEdited = true;
        },

        requestedReviewFromUser: (state, action: PayloadAction<RequestUserReview>) => {
            state.list.filter(review => review.userId === action.payload.userId);
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
