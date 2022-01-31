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
    Link,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { setShowLoginDialog } from "../../../app/slices/ui/dialogs/loginDialog";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useLazyLoginUserQuery } from "../../../app/services/users";
import { userLoggedIn } from "../../../app/slices/auth/auth";
import { createSnack } from "../../../app/slices/ui/snackbars/snack";
import { Link as RouterLink } from "react-router-dom";

const LoginDialog = () => {
    const open = useAppSelector(state => state.ui.dialogs.login.show);
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    const [login] = useLazyLoginUserQuery();

    const handleOnClose = () => {
        setEmail("");
        setPassword("");
        setIsValidEmail(false);
        setIsValidPassword(false);
        setShowPassword(false);
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
                    <Box>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Link component={RouterLink} to="/registernew">
                                Sign up!
                            </Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link component={RouterLink} to="/registernew">
                                Forgot password?
                            </Link>
                        </Typography>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    size="large"
                    variant="outlined"
                    onClick={() => dispatch(setShowLoginDialog(false))}
                >
                    Cancel
                </Button>
                <Button
                    size="large"
                    variant="contained"
                    disabled={!isValidEmail || !isValidPassword}
                    onClick={async () => {
                        try {
                            const user = await login({ email, password }).unwrap();
                            dispatch(userLoggedIn(user));
                            dispatch(setShowLoginDialog(false));
                            dispatch(
                                createSnack({
                                    message: "Logged in successfully!",
                                    severity: "success",
                                })
                            );
                        } catch (err) {
                            dispatch(
                                createSnack({
                                    message: err.data,
                                    severity: "error",
                                })
                            );
                        }
                    }}
                >
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;