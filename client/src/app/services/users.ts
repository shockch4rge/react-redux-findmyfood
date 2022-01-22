import { UserData } from "../../models/User";
import { userLoggedIn, userLoggedOut } from "../slices/auth";
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

        registerUser: builder.mutation<UserData, Omit<UserData, "id">>({
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

        loginUser: builder.mutation<UserData, LoginRequest>({
            query: ({ email, password }) => ({
                url: `/login/${email}&${password}`,
                method: "get",
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useDeleteUserMutation,
    useRegisterUserMutation,
    useUpdateUserMutation,
    useLoginUserMutation,
} = users;
