import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWithValidation from "../components/common/FormWithValidation";
import { useAuth } from "../hooks/useAuth";
import { userLoggedIn } from "../store/slices/auth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import api from "../api";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) navigate("/restaurant");
    }, []);

    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        api.request({
            url: "/login/email&password",
            method: "get",
            params: {
                email: email,
                password: password,
            },
        })
            .then(response => {
                console.log(response);
                dispatch(userLoggedIn(response.data))
            })
            .catch(console.log);
    };

    console.log(password);
    

    return (
        <>
            <FormWithValidation label="Email" type="email" onChange={setUsername} />
            <FormWithValidation label="Password" type="password" onChange={setPassword} />
            <Button onClick={() => handleLogin()}>Hello!</Button>
        </>
    );
};

export default Login;
