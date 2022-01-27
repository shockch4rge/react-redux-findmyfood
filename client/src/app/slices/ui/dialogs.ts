import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewData } from "../../../models/Review";

type SetWriteReviewDialogPayload = Pick<ReviewData, "title" | "content" | "rating">;

type SetEditReviewDialogPayload = Pick<ReviewData, "title" | "content" | "rating">;

const dialogs = createSlice({
    name: "dialogs",

    initialState: {
        writeReview: {
            show: false,
            payload: {} as Pick<ReviewData, "title" | "content" | "rating">,
        },
        editReview: {
            show: false,
            payload: {} as Pick<ReviewData, "title" | "content" | "rating">,
        },
        deleteReview: {
            show: false,
        },
    },

    reducers: {
        setShowWriteReviewDialog: (state, action: PayloadAction<boolean>) => {
            state.writeReview.show = action.payload;
        },

        setWriteReviewDialogPayload: (
            state,
            action: PayloadAction<SetWriteReviewDialogPayload>
        ) => {
            state.writeReview.payload = action.payload;
        },

        setShowEditReviewDialog: (state, action: PayloadAction<boolean>) => {
            state.editReview.show = action.payload;
        },

        setEditReviewDialogPayload: (state, action: PayloadAction<SetEditReviewDialogPayload>) => {
            state.editReview.payload = action.payload;
        },

        setShowDeleteReviewDialog: (state, action: PayloadAction<boolean>) => {
            state.deleteReview.show = action.payload;
        },
    },
});

export const {
    setShowWriteReviewDialog,
    setWriteReviewDialogPayload,
    setShowEditReviewDialog,
    setEditReviewDialogPayload,
    setShowDeleteReviewDialog,
} = dialogs.actions;
export default dialogs.reducer;
