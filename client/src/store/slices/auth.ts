import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../../../server/src/models/User";

type LogIn = UserData;

const slice = createSlice({
    name: "auth",

    initialState: {
        loggedIn: false,
        user: null as UserData | null,
    },

    reducers: {
        userLoggedIn: (state, action: PayloadAction<LogIn>) => {
            state.loggedIn = true;
            state.user = action.payload;
        },

        userLoggedOut: state => {
            state.loggedIn = false;
            state.user = null;
        },
    },
});

export const { userLoggedIn, userLoggedOut } = slice.actions;
export default slice.reducer;
