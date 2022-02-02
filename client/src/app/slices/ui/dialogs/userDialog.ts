import { createSlice } from "@reduxjs/toolkit";

const userDialog = createSlice({
    name: "user",

    initialState: {
        login: {
            show: false,
        },

        delete: {
            show: false,
        },
    },

    reducers: {
        setShowLoginDialog: (state, action) => {
            state.login.show = action.payload;
        },

        setShowDeleteUserDialog: (state, action) => {
            state.delete.show = action.payload;
        },
    },
});

export const { setShowLoginDialog, setShowDeleteUserDialog } = userDialog.actions;
export default userDialog;
