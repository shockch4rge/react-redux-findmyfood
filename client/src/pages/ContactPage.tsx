import Footer from "../components/Footer";
import {
    Button,
    Container,
    InputLabel,
    TextField,
    Typography,
    Paper,
    Box,
    Stack,
    CircularProgress,
    Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSendFeedbackEmailMutation } from "../app/services/emails";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useState } from "react";
import { createSnack } from "../app/slices/ui/snackbars/snack";
import { AuthHelper } from "../utilities/AuthHelper";

const ContactPage = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");

    const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
    const [isValidFeedback, setIsValidFeedback] = useState<boolean | null>(null);

    const [sendFeedback, { isLoading: emailSending }] = useSendFeedbackEmailMutation();

    return (
        <>
            <Container>
                <Typography mt={6} variant="h2" textAlign="center">
                    FindMyFood!
                </Typography>
                <Typography variant="h5" textAlign="center">
                    Contact us!
                </Typography>
                <Paper elevation={4} sx={{ p: 5, mt: 7, borderRadius: 6 }}>
                    <Stack spacing={2}>
                        <Box>
                            <InputLabel htmlFor="email-form">Email: </InputLabel>
                            <TextField
                                id="email-form"
                                fullWidth
                                error={isValidEmail !== null && !isValidEmail}
                                onChange={({ target: { value } }) => {
                                    setEmail(value);
                                    setIsValidEmail(AuthHelper.isEmail(value));
                                }}
                                helperText={
                                    isValidEmail !== null && !isValidEmail
                                        ? "Please enter a valid email address."
                                        : ""
                                }
                            />
                        </Box>
                        <Box>
                            <InputLabel htmlFor="feedback-form">Write your feedback here:</InputLabel>
                            <TextField
                                id="feedback-form"
                                multiline
                                rows={12}
                                placeholder="What do you like about our website?"
                                fullWidth
                                error={isValidFeedback !== null && !isValidFeedback}
                                onChange={({ target: { value } }) => {
                                    setFeedback(value);
                                    setIsValidFeedback(value.length >= 20);
                                }}
                                helperText={
                                    isValidFeedback !== null && !isValidFeedback ? "20-250 characters" : ""
                                }
                            />
                        </Box>
                        
                        <Typography variant="body2">
                            Not supposed to be here? Return to the{" "}
                            <Link component={RouterLink} to="/home">
                                home page.
                            </Link>
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            disabled={!isValidEmail || !isValidFeedback || emailSending}
                            onClick={async () => {
                                try {
                                    await sendFeedback({ email, feedback }).unwrap();
                                    dispatch(
                                        createSnack({
                                            message: "Feedback received! We'll email you a copy.",
                                            severity: "success",
                                        })
                                    );
                                } catch (err) {
                                    console.log(err.data);
                                    dispatch(createSnack({ message: err.data, severity: "error" }));
                                }
                            }}>
                            Send Feedback
                            {emailSending && <CircularProgress size={24} sx={{ position: "absolute" }} />}
                        </Button>
                    </Stack>
                </Paper>
            </Container>
            <Footer />
        </>
    );
};

export default ContactPage;
