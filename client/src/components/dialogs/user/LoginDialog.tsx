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
import { setShowLoginDialog } from "../../../app/slices/ui/dialogs/userDialog";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useLazyLoginUserQuery } from "../../../app/services/users";
import { userLoggedIn } from "../../../app/slices/auth/auth";
import { createSnack } from "../../../app/slices/ui/snackbars/snack";
import { Link as RouterLink } from "react-router-dom";
import { useSendEmailMutation } from "../../../app/services/emails";
import { AuthHelper } from "../../../utilities/AuthHelper";

const LoginDialog = () => {
    const open = useAppSelector(state => state.ui.dialogs.user.login.show);
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sendEmail] = useSendEmailMutation();
    const [showPassword, setShowPassword] = useState(false);

    /**
     * we set initial state to null for grey text fields - they'll only turn red
     * if the user enters something in them. user experience!
     */
    const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
    const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);

    const [login] = useLazyLoginUserQuery();

    // reset back to initial state
    const handleOnClose = () => {
        setEmail("");
        setPassword("");
        setIsValidEmail(null);
        setIsValidPassword(null);
        setShowPassword(false);
    };

    return (
        <Dialog open={open} onClose={handleOnClose} fullWidth>
            <Box m={2}>
                <Typography textAlign="center" variant="h4">
                    Login to FindMyFood!
                </Typography>
            </Box>
            <DialogContent>
                <Stack spacing={3}>
                    <TextField
                        label="Email"
                        onChange={({ target: { value } }) => {
                            setEmail(value);
                            setIsValidEmail(AuthHelper.isEmail(value));
                        }}
                        error={isValidEmail !== null && !isValidEmail}
                        helperText={isValidEmail !== null && !isValidEmail && "Please enter a valid email."}
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
                        error={isValidPassword !== null && !isValidPassword}
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
                            <Link component={RouterLink} to="/register">
                                Sign up!
                            </Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link component={RouterLink} to="/forgot-password">
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
                    onClick={() => {
                        dispatch(setShowLoginDialog(false));
                        // handleOnClose isn't called automatically for some reason
                        handleOnClose();
                    }}>
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
                                createSnack({ message: `Welcome back, ${user.username}!`, severity: "success" })
                            );
                        } catch (err) {
                            dispatch(createSnack({ message: err.data, severity: "error" }));
                        }
                    }}>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;
