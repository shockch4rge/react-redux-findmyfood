import React, { useState } from "react";
import { Snackbar, Alert, AlertProps } from "@mui/material";

interface Props {
    severity?: AlertProps["severity"];
    message: string;
    open: boolean;
    onClose: () => void;
}

const Snack = ({ message, severity, open, onClose }: Props) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Snack;
