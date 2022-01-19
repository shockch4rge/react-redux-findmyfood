import { UserData } from "../../models/User";
import mainApi from "./mainApi";

const users = mainApi.injectEndpoints({
    overrideExisting: false,

    endpoints: builder => ({
        getUser: builder.query<UserData, string>({
            query: id => ({
                url: `/user/${id}`,
                method: "get",
            }),
        }),

        registerUser: builder.query<void, UserData>({
            query: user => ({
                url: `/user`,
                method: "post",
                body: user,
            }),
        }),

        deleteUser: builder.query<void, string>({
            query: id => ({
                url: `/user/${id}`,
                method: "delete",
            }),
        }),

        updateUser: builder.query<UserData, UserData>({
            query: updated => ({
                url: `/user/${updated.id}`,
                method: "put",
                // body: bruhh gonna go sleep
            }),
        }),
    }),
});

export const { useGetUserQuery, useDeleteUserQuery, useRegisterUserQuery, useUpdateUserQuery } =
    users;
