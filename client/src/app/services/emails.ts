import api from "./api";

const emails = api.injectEndpoints({
    endpoints: builder => ({
        sendResetPasswordEmail: builder.mutation<void, string>({
            query: email => ({
                url: `/reset-password/${email}`,
                method: "post",
            }),
        }),

        sendFeedbackEmail: builder.mutation<void, { email: string; feedback: string }>({
            query: ({ email, feedback }) => ({
                url: `/send-feedback/${email}`,
                method: "post",
                body: {
                    feedback
                }
            }),
        }),
    }),
});

export const { useSendResetPasswordEmailMutation, useSendFeedbackEmailMutation } = emails;
