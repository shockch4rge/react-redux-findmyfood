import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWithValidation from "../components/common/FormWithValidation";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useEmailer } from "../hooks/useEmailer";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, logIn } = useAuth();
    const { sendEmail } = useEmailer();

    useEffect(() => {
        if (user) navigate("/restaurant");
    }, []);

    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Box sx={{ mx: "auto" }}>
                <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
                    <FormWithValidation label="Email" type="email" onChange={setUsername} />
                    <FormWithValidation label="Password" type="password" onChange={setPassword} />
                </Box>
                <Button onClick={() => sendEmail(email)}>Forgot Password?</Button>
                <Button onClick={() => logIn(email, password)}>Hello!</Button>
            </Box>
        </>
    );
};

export default Login;
