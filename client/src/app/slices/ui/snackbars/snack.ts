import { AlertProps, SnackbarProps } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackState {
    show?: boolean;
    message?: string;
    severity?: AlertProps["severity"];
    anchorOrigin?: SnackbarProps["anchorOrigin"];
}


const snack = createSlice({
    name: "snack",

    initialState: {
        show: false,
        message: "",
        severity: "success",
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
        }
    } as SnackState,

    reducers: {
        createSnack: (state, action: PayloadAction<SnackState>) => {
            return ({
                show: action.payload.show ?? true,
                message: action.payload.message ?? state.message ?? "",
                severity: action.payload.severity ?? state.severity ?? "success",
                anchorOrigin: action.payload.anchorOrigin ?? { 
                    vertical: "bottom",
                    horizontal: "center",
                }
            });
        },

        closeSnack: (state) => {
            return ({
                ...state,
                show: false,
            })
        }
    },
});

export const { createSnack, closeSnack } = snack.actions;
export default snack;
