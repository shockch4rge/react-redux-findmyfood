import React, { useState } from "react";
import { Snackbar, Alert, AlertProps, SnackbarProps } from "@mui/material";

interface Props {
    severity: AlertProps["severity"];
    message: string;
    open: boolean;
    onClose: () => void;
    anchorOrigin?: SnackbarProps["anchorOrigin"];
}

const Snack = ({ message, severity, open, onClose, anchorOrigin }: Props) => {
    return (
        <Snackbar open={open} anchorOrigin={anchorOrigin} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Snack;
