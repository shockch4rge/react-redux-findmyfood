import {
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    Box,
    Typography,
    InputLabel,
    TextField,
    DialogActions,
    Button,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { setShowLoginDialog } from "../../../app/slices/ui/dialogs/loginDialog";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useLazyLoginUserQuery } from "../../../app/services/users";
import Snack from "../../common/Snack";
import { userLoggedIn } from "../../../app/slices/auth/auth";

const LoginDialog = () => {
    const open = useAppSelector(state => state.ui.dialogs.login.show);
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [openErrorSnack, setOpenErrorSnack] = useState(false);
    const [openSuccessSnack, setOpenSuccessSnack] = useState(false);

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    const [login] = useLazyLoginUserQuery();

    const handleOnClose = () => {
        setEmail("");
        setPassword("");
        setIsValidEmail(false);
        setIsValidPassword(false);
    };

    return (
        <Dialog open={open} onClose={handleOnClose} fullWidth>
            <Box m={2}>
                <Typography textAlign="center" variant="h3">
                    FindMyFood!
                </Typography>
            </Box>
            <DialogContent>
                <Stack spacing={3}>
                    <TextField
                        autoComplete="off"
                        label="Email"
                        onChange={({ target: { value } }) => {
                            setEmail(value);
                            setIsValidEmail(value.length > 0);
                        }}
                        error={!isValidEmail}
                    />
                    <TextField
                        autoComplete="off"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={({ target: { value } }) => {
                            setPassword(value);
                            setIsValidPassword(value.length > 0);
                        }}
                        error={!isValidPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography variant="body2">
                        Don't have an account? Sign up!
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => dispatch(setShowLoginDialog(false))}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disabled={!isValidEmail || !isValidPassword}
                    onClick={async () => {
                        try {
                            const user = await login({ email, password }).unwrap();
                            dispatch(userLoggedIn(user));
                            dispatch(setShowLoginDialog(false));
                        } catch (err) {
                            console.log(err);
                            setOpenErrorSnack(true);
                        }
                    }}
                >
                    Login
                </Button>
            </DialogActions>

            <Snack
                open={openErrorSnack}
                severity="error"
                message="Error logging in!"
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setOpenErrorSnack(false)}
            />
            <Snack
                open={openSuccessSnack}
                severity="success"
                message="Logged in!"
                onClose={() => setOpenSuccessSnack(false)}
            />
        </Dialog>
    );
};

export default LoginDialog;
