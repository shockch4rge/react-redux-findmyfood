import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../models/User";

// #region actions
type RequestUser = Pick<UserData, "id">;

type RegisterUser = UserData;
// #endregion

const slice = createSlice({
    name: "users",

    initialState: {
        list: [] as UserData[],
        lastFetch: null,
        loading: false,
    },

    reducers: {
        userRequested: (user, action: PayloadAction<RequestUser>) => {},

        userRegistered: (user, action: PayloadAction<RegisterUser>) => {
            user.list.push({ ...action.payload });
        },
    },
});

export const { userRegistered, userRequested } = slice.actions;

export default slice.reducer;
