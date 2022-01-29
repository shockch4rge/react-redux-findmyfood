import { createSlice } from "@reduxjs/toolkit";

const loginDialog = createSlice({
    name: "loginDialog",

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
export default loginDialog.reducer;
