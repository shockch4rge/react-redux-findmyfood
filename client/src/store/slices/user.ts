import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../../../server/src/models/users/User";

// #region actions
type RequestUser = Pick<UserData, "id">;

type RegisterUser = UserData;
// #endregion

const slice = createSlice({
    name: "user",

    initialState: null as UserData | null,

    reducers: {
        userRequested: (user, action: PayloadAction<RequestUser>) => {},

        userRegistered: (user, action: PayloadAction<RegisterUser>) => {
            return action.payload;
        },
    },
});

export const { userRegistered, userRequested } = slice.actions;

export default slice.reducer;
