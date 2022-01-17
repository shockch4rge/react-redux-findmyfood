import { createSlice } from "@reduxjs/toolkit";
import ReplyData from "../../../../server/src/models/Reply";
import { PayloadAction } from "@reduxjs/toolkit";
// #region actions
type AddReply = ReplyData;

type DeleteReply = Pick<ReplyData, "id">;
// #endregion

const slice = createSlice({
    name: "replies",

    initialState: {
        list: [] as ReplyData[],
        lastFetch: null,
        loading: false,
    },

    reducers: {
        replyAdded: (state, action: PayloadAction<AddReply>) => {
            state.list.push({ ...action.payload } as ReplyData);
        },

        replyDeleted: (state, action: PayloadAction<DeleteReply>) => {
            const index = state.list.findIndex(reply => reply.id === action.payload.id);

            state.list.splice(index, 1);
        },
    },
});

export default slice.reducer;
