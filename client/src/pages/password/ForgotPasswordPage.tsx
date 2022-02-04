import {
    Box,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
    Link,
    Grow,
    Button,
    CircularProgress,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthHelper } from "../../utilities/AuthHelper";
import DoneIcon from "@mui/icons-material/Done";
import { useSendEmailMutation } from "../../app/services/emails";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createSnack } from "../../app/slices/ui/snackbars/snack";
import { useEffect } from "react";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
    const [showSentEmail, setShowSentEmail] = useState(false);
    const [sendEmail, { isLoading: emailSending, isSuccess: emailSent }] = useSendEmailMutation();

    const handleEmailChange = ({ target: { value } }: any) => {
        setEmail(value);
        setIsValidEmail(AuthHelper.isEmail(value));
    };

    const handleSendEmail = async () => {
        try {
            await sendEmail(email).unwrap();
        } catch (err) {
            dispatch(createSnack({ message: err.data, severity: "error" }));
        }
    };

    useEffect(() => {
        if (emailSent) {
            setShowSentEmail(true);
            setTimeout(() => navigate("/home"), 4000);
        }
    }, [emailSent]);

    return (
        <Container maxWidth="md">
            <Box display={showSentEmail ? "none" : "flex"}>
                <Box>
                    <Typography my={10} variant="h1" textAlign="center">
                        Forgot your password?
                    </Typography>
                    <Paper elevation={3} sx={{ p: 5 }}>
                        <Typography variant="body2">
                            Don't worry, type in your email so we can send you instructions on how to reset
                            your password.
                        </Typography>
                        <Stack mt={2} my={4} spacing={2}>
                            <TextField
                                label="Enter your email address"
                                onChange={handleEmailChange}
                                error={isValidEmail !== null && !isValidEmail}
                                helperText={
                                    isValidEmail !== null && !isValidEmail
                                        ? "Please enter a valid email address."
                                        : ""
                                }
                            />
                        </Stack>

                        <Box mb={3}>
                            <Typography variant="body2">
                                Not supposed to be here? Navigate back to{" "}
                                <Link component={RouterLink} to="/home">
                                    home.
                                </Link>
                            </Typography>
                            <Typography variant="body2">
                                Don't have an account?{" "}
                                <Link component={RouterLink} to="/register">
                                    Sign up.
                                </Link>
                            </Typography>
                        </Box>

                        <Button
                            disabled={!isValidEmail || emailSending}
                            fullWidth
                            variant="contained"
                            onClick={handleSendEmail}>
                            Send Email
                            {emailSending && <CircularProgress size={24} sx={{ position: "absolute" }} />}
                        </Button>
                    </Paper>
                </Box>
            </Box>

            <Box mt={50} display={showSentEmail ? "flex" : "none"} justifyContent="center" alignItems="center">
                <Grow in={showSentEmail} timeout={1500}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 6 }}>
                        <Stack spacing={2} alignItems="center" justifyContent="center">
                            <Box
                                width={75}
                                height={75}
                                borderRadius="50%"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ backgroundImage: "var(--gradient)" }}>
                                <DoneIcon
                                    fontSize="large"
                                    sx={{ color: theme => theme.palette.common.white }}
                                />
                            </Box>
                            <Typography textAlign="center">
                                An email has been sent. Redirecting you to the home page...
                            </Typography>
                        </Stack>
                    </Paper>
                </Grow>
            </Box>
        </Container>
    );
};

export default ForgotPasswordPage;
