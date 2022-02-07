import { UserData } from "../../models/User";
import { userLoggedIn, userLoggedOut } from "../slices/auth/auth";
import { cacher } from "../../utilities/cacher";
import api from "./api";

// #region query arg types
export type LoginRequest = {
    email: string;
    password: string;
};
// #endregion

const users = api.injectEndpoints({
    overrideExisting: false,

    endpoints: builder => ({
        getUser: builder.query<UserData, string>({
            query: id => ({
                url: `/user/${id}`,
                method: "get",
            }),

            providesTags: cacher.cacheByIdArg("Users"),
        }),

        registerUser: builder.mutation<UserData, FormData>({
            query: user => ({
                url: `/user`,
                method: "post",
                body: user,
            }),
        }),

        deleteUser: builder.mutation<void, string>({
            query: id => ({
                url: `/user/${id}`,
                method: "delete",
            }),

            invalidatesTags: cacher.invalidatesList("Users"),
        }),

        updateUser: builder.mutation<void, { id: string; form: FormData }>({
            query: ({ id, form }) => ({
                url: `/user/${id}`,
                method: "put",
                body: form,
            }),
        }),

        loginUser: builder.query<UserData, LoginRequest>({
            query: ({ email, password }) => ({
                url: `/login/${email}&${password}`,
                method: "get",
            }),

            keepUnusedDataFor: 1,
        }),

        resetPassword: builder.mutation<void, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: `/reset-password/${email}`,
                method: "put",
                body: {
                    password,
                },
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useDeleteUserMutation,
    useRegisterUserMutation,
    useUpdateUserMutation,
    useLazyLoginUserQuery,
    useResetPasswordMutation,
} = users;
