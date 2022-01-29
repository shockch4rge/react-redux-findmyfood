import { UserData } from "../../models/User";
import { userLoggedIn, userLoggedOut } from "../slices/auth/auth";
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
        }),

        updateUser: builder.mutation<UserData, UserData>({
            query: updated => ({
                url: `/user/${updated.id}`,
                method: "put",
                // body: bruhh gonna go sleep
            }),
        }),

        loginUser: builder.query<UserData, LoginRequest>({
            query: ({ email, password }) => ({
                url: `/login/${email}&${password}`,
                method: "get",
            }),

            keepUnusedDataFor: 0,
        }),
    }),
});

export const {
    useGetUserQuery,
    useDeleteUserMutation,
    useRegisterUserMutation,
    useUpdateUserMutation,
    useLazyLoginUserQuery,
} = users;
