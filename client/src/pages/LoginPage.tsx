import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest, useLazyLoginUserQuery } from "../app/services/users";
import { userLoggedIn } from "../app/slices/auth/auth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLazyLoginUserQuery();
    const [loginDetails, setLoginDetails] = useState<LoginRequest>({
        email: "",
        password: "",
    });
    const user = useAppSelector(state => state.auth);

    // navigate to home if user to already logged in on page mount
    useEffect(() => {
        if (user) navigate("/home");
    }, [user]);

    console.log(loginDetails);

    const handleLoginDetailsChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setLoginDetails(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Box sx={{ mx: "auto" }}>
                <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        onChange={handleLoginDetailsChange}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        onChange={handleLoginDetailsChange}
                    />
                </Box>
                <Button onClick={() => {}}>Forgot Password?</Button>
                <Button
                    onClick={() => {
                        login(loginDetails)
                            .unwrap()
                            .then(user => dispatch(userLoggedIn(user)))
                            .catch(console.log);
                    }}
                >
                    Login
                </Button>
            </Box>
        </>
    );
};

export default Login;
