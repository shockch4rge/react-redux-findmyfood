import { createSlice } from "@reduxjs/toolkit";
import ReplyData from "../../../../server/src/models/Reply";
import { PayloadAction } from "@reduxjs/toolkit";
// #region actions
type AddReply = ReplyData;

type DeleteReply = Pick<ReplyData, "id">;
// #endregion

const slice = createSlice({
    name: "replies",
    initialState: [] as ReplyData[],
    reducers: {
        replyAdded: (replies, action: PayloadAction<AddReply>) => {
            replies.push({ ...action.payload } as ReplyData);
        },

        replyDeleted: (replies, action: PayloadAction<DeleteReply>) => {
            const index = replies.findIndex(reply => reply.id === action.payload.id);

            replies.splice(index, 1);
        },
    },
});

export default slice.reducer;
