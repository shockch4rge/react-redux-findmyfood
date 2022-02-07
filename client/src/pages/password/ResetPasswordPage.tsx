import {
    Container,
    Card,
    Box,
    InputLabel,
    TextField,
    Button,
    Typography,
    Paper,
    Stack,
    Link,
    CircularProgress,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { useState } from "react";
import { AuthHelper } from "../../utilities/AuthHelper";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useResetPasswordMutation } from "../../app/services/users";
import { createSnack } from "../../app/slices/ui/snackbars/snack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Footer from "../../components/Footer";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
    const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);

    const [resetPassword, { isLoading: passwordResetting }] = useResetPasswordMutation();

    return (
        <>
            <Container>
                <Typography my={10} variant="h1" textAlign="center">
                    Reset your password
                </Typography>
                <Paper elevation={4} sx={{ p: 5, mt: 7, borderRadius: 6 }}>
                    <Stack spacing={3}>
                        <Box>
                            <InputLabel htmlFor="reset-password-email-field">Enter your email: </InputLabel>
                            <TextField
                                id="reset-password-field"
                                fullWidth
                                error={isValidEmail !== null && !isValidEmail}
                                onChange={({ target: { value } }) => {
                                    setEmail(value);
                                    setIsValidEmail(AuthHelper.isEmail(value));
                                }}
                                helperText={
                                    isValidEmail !== null && !isValidEmail ? "Please enter a valid email." : ""
                                }
                            />
                        </Box>
                        <Box>
                            <InputLabel htmlFor="reset-password-field">Enter your new password: </InputLabel>
                            <TextField
                                id="reset-password-field"
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                error={isValidPassword !== null && !isValidPassword}
                                onChange={({ target: { value } }) => {
                                    setPassword(value);
                                    setIsValidPassword(AuthHelper.isPassword(value));
                                }}
                                helperText={
                                    isValidPassword !== null && !isValidPassword
                                        ? "Please enter a valid password."
                                        : ""
                                }
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
                        </Box>
                        <Box>
                            <InputLabel htmlFor="reset-password-confirm-field">
                                Confirm your new password:{" "}
                            </InputLabel>
                            <TextField
                                id="reset-password-confirm-field"
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                error={password !== confirmPassword}
                                onChange={({ target: { value } }) => {
                                    setConfirmPassword(value);
                                }}
                                helperText={
                                    (isValidPassword !== null && !isValidPassword) ||
                                    confirmPassword !== password
                                        ? "Password does not match."
                                        : ""
                                }
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
                        </Box>

                        <PasswordStrengthMeter
                            sections={[
                                {
                                    color: "#FF2100",
                                    valid: AuthHelper.hasLength(password),
                                    criteria: "Is at least 8 characters long",
                                },
                                {
                                    color: "#FF4300",
                                    valid: AuthHelper.hasDigits(password),
                                    criteria: "Contains at least 2 digits",
                                },
                                {
                                    color: "#FFC900",
                                    valid: AuthHelper.hasUpperCaseLetters(password),
                                    criteria: "Contains at least 2 uppercase letters",
                                },
                                {
                                    color: "#0DFF00",
                                    valid: AuthHelper.hasSpecialCharacters(password),
                                    criteria: "Contains at least 1 special character",
                                },
                            ]}
                            finalValidation={isValidPassword}
                        />

                        <Typography variant="body2">
                            Not supposed to be here? Return to the{" "}
                            <Link component={RouterLink} to="/home">
                                home page.
                            </Link>
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            disabled={!isValidEmail || !isValidPassword || passwordResetting}
                            onClick={async () => {
                                try {
                                    await resetPassword({ email, password }).unwrap();
                                    dispatch(
                                        createSnack({
                                            message: "Password reset! Please login again.",
                                            severity: "success",
                                        })
                                    );
                                    navigate("/home");
                                } catch (err) {
                                    console.log(err.data);
                                    dispatch(createSnack({ message: err.data, severity: "error" }));
                                }
                            }}>
                            Reset Password
                            {passwordResetting && <CircularProgress size={24} sx={{ position: "absolute" }} />}
                        </Button>
                    </Stack>
                </Paper>
            </Container>
            <Footer />
        </>
    );
};

export default ResetPasswordPage;
