import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "auth",

    initialState: {
        loggedIn: false,
    },
    
    reducers: {
        loggedIn: (auth, action: PayloadAction<boolean>) => {
            auth.loggedIn = action.payload;
        },

        loggedOut: (auth, action: PayloadAction<boolean>) => {
            auth.loggedIn = action.payload;
        },
    },
});

export const { loggedIn, loggedOut } = slice.actions;
export default slice.reducer;
