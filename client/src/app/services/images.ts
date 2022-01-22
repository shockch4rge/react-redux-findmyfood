import api from "./api";

const images = api.injectEndpoints({
    endpoints: builder => ({
        getUserAvatar: builder.query<string, string>({
            query: (userId: string) => ({
                url: `/image/user/${userId}`,
            }),
        }),

        uploadUserAvatar: builder.mutation<void, { form: FormData; userId: string }>({
            query: ({ form, userId }) => ({
                url: `/image/user/${userId}`,
                method: "post",
                body: form,
            }),

            onCacheEntryAdded: async (_, api) => {
                const cache = api.getCacheEntry().data;
                console.log(cache);
            },
        }),
    }),
});

export const { useGetUserAvatarQuery, useUploadUserAvatarMutation } = images;
