import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest, useLoginUserMutation } from "../app/services/users";
import { userLoggedIn } from "../app/slices/auth/auth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth);

    useEffect(() => {
        if (user) navigate("/home");
    });

    const [login] = useLoginUserMutation();
    const [loginDetails, setLoginDetails] = useState<LoginRequest>({
        email: "",
        password: "",
    });

    const handleChange = (name: string, value: string) => {
        setLoginDetails(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Box sx={{ mx: "auto" }}>
                <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
                    <EnhancedInput
                        label="Email"
                        type="email"
                        onChange={e => handleChange(e.target.name, e.target.value)}
                    />
                    <EnhancedInput
                        label="Password"
                        type="password"
                        onChange={e => handleChange(e.target.name, e.target.value)}
                    />
                </Box>
                <Button onClick={() => {}}>Forgot Password?</Button>
                <Button
                    onClick={() => {
                        login(loginDetails)
                            .unwrap()
                            .then(user => {
                                dispatch(userLoggedIn(user));
                                navigate("/home");
                            })
                            .catch(console.log);
                    }}
                >
                    Hello!
                </Button>
            </Box>
        </>
    );
};

export default Login;
