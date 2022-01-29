import { createSlice } from "@reduxjs/toolkit";
import { ReplyData } from "../../../../models/Reply";

const replyDialog = createSlice({
    name: "reply",

    initialState: {
        write: {
            show: false,
            payload: {} as Pick<ReplyData, "content">,
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
    replyDialog.actions;
export default replyDialog;