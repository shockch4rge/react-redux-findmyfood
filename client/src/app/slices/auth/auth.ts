import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../../models/User"

type LogIn = UserData;

const auth = createSlice({
    name: "auth",

    initialState: null as UserData | null,

    reducers: {
        userLoggedIn: (state, action: PayloadAction<LogIn>) => {
            return action.payload;
        },

        userLoggedOut: () => {
            return null;
        },
    },
});

export const { userLoggedIn, userLoggedOut } = auth.actions;
export default auth
