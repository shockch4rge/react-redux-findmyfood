import { createSlice } from "@reduxjs/toolkit";

const reviewDialogSlice = createSlice({
    name: "reviewDialog",

    initialState: {
        write: {
            show: false,
        },

        edit: {
            show: false,
        },

        delete: {
            show: false,
        },
    },

    reducers: {
        setShowWriteReviewDialog: (state, action) => {
            state.write.show = action.payload;
        },

        setShowEditReviewDialog: (state, action) => {
            state.edit.show = action.payload;
        },

        setShowDeleteReviewDialog: (state, action) => {
            state.delete.show = action.payload;
        },
    },
});

export const { setShowDeleteReviewDialog, setShowEditReviewDialog, setShowWriteReviewDialog } =
    reviewDialogSlice.actions;
export default reviewDialogSlice.reducer;
