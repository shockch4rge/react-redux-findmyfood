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

        updateUser: builder.mutation<UserData, UserData>({
            query: updated => ({
                url: `/user/${updated.id}`,
                method: "put",
            }),
        }),

        loginUser: builder.query<UserData, LoginRequest>({
            query: ({ email, password }) => ({
                url: `/login/${email}&${password}`,
                method: "get",
            }),

            keepUnusedDataFor: 1,
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
