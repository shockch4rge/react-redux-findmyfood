import api from "./api";

const emails = api.injectEndpoints({
    endpoints: builder => ({
        sendEmail: builder.mutation<void, string>({
            query: email => ({
                url: `/send/${email}`,
                method: "post",
            }),
        }),
    }),
});

export const { useSendEmailMutation } = emails;
