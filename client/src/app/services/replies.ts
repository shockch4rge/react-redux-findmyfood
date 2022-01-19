import { ReplyData } from "../../models/Reply";
import mainApi from "./mainApi";

const replies = mainApi.injectEndpoints({
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

        addReply: builder.query<void, ReplyData>({
            query: reply => ({
                url: `/reply`,
                method: "post",
                body: reply,
            }),
        }),

        deleteReply: builder.query<void, string>({
            query: id => ({
                url: `/reply/${id}`,
                method: "delete",
            }),
        }),

        editReply: builder.query<void, Omit<ReplyData, "userId" | "reviewId">>({
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
    useAddReplyQuery,
    useDeleteReplyQuery,
    useGetReplyQuery,
    useGetReviewRepliesQuery,
    useEditReplyQuery,
} = replies;
