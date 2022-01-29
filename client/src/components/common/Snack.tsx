import React, { useState } from "react";
import { Snackbar, Alert, AlertProps, SnackbarProps } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createSnack } from "../../app/slices/ui/snackbars/snack";

const Snack = () => {
    const { show, message, severity, anchorOrigin } = useAppSelector(state => state.ui.snack);
    const dispatch = useAppDispatch();

    const handleOnClose = () => {
        dispatch(createSnack({ show: false }));
    };

    return (
        <Snackbar
            open={show}
            anchorOrigin={anchorOrigin}
            autoHideDuration={3000}
            onClose={handleOnClose}
        >
            <Alert onClose={handleOnClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Snack;
