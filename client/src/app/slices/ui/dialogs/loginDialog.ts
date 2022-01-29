import { createSlice } from "@reduxjs/toolkit";

const loginDialog = createSlice({
    name: "login",

    initialState: {
        show: false,
    },

    reducers: {
        setShowLoginDialog: (state, action) => {
            state.show = action.payload;
        },
    },
});

export const { setShowLoginDialog } = loginDialog.actions;
export default loginDialog;
