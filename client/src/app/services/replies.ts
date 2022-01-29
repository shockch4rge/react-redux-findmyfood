import { ReplyData } from "../../models/Reply";
import api from "./api";

const replies = api.injectEndpoints({
    overrideExisting: false,

    endpoints: builder => ({
        getReviewReplies: builder.query<ReplyData[], string>({
            query: reviewId => ({
                url: `/replies/${reviewId}`,
                method: "get",
            }),
        }),

        getReply: builder.query<ReplyData, string>({
            query: id => ({
                url: `/reply/${id}`,
                method: "get",
            }),
        }),

        addReply: builder.mutation<void, Omit<ReplyData, "id" | "isEdited">>({
            query: reply => ({
                url: `/reply`,
                method: "post",
                body: reply,
            }),
        }),

        deleteReply: builder.mutation<void, string>({
            query: id => ({
                url: `/reply/${id}`,
                method: "delete",
            }),
        }),

        editReply: builder.mutation<void, Omit<ReplyData, "userId" | "reviewId">>({
            query: edited => ({
                url: `/reply/${edited.id}`,
                method: "put",
                body: {
                    content: edited.content,
                    timestamp: edited.timestamp,
                    isEdited: edited.isEdited,
                } as Omit<ReplyData, "id" | "userId" | "reviewId">,
            }),
        }),
    }),
});

export const {
    useAddReplyMutation,
    useDeleteReplyMutation,
    useGetReplyQuery,
    useGetReviewRepliesQuery,
    useLazyGetReviewRepliesQuery,
    useEditReplyMutation,
} = replies;
