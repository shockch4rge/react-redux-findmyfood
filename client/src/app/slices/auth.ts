import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../../../server/src/api/users/User";

type LogIn = UserData;

const slice = createSlice({
    name: "auth",

    initialState: null as UserData | null,

    reducers: {
        userLoggedIn: (state, action: PayloadAction<LogIn>) => {
            state = action.payload;
        },

        userLoggedOut: state => {
            state = null;
        },
    },
});

export const { userLoggedIn, userLoggedOut } = slice.actions;
export default slice.reducer;
