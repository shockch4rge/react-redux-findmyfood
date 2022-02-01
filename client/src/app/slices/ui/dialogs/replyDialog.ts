import { createSlice } from "@reduxjs/toolkit";

const replyDialogSlice = createSlice({
    name: "reply",

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
        setShowWriteReplyDialog: (state, action) => {
            state.write.show = action.payload;
        },

        setShowEditReplyDialog: (state, action) => {
            state.edit.show = action.payload;
        },

        setShowDeleteReplyDialog: (state, action) => {
            state.delete.show = action.payload;
        },
    },
});

export const { setShowDeleteReplyDialog, setShowEditReplyDialog, setShowWriteReplyDialog } =
    replyDialogSlice.actions;
export default replyDialogSlice;