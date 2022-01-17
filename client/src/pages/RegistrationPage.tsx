import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAuth } from "../hooks/useAuth";
import { Box, TextField } from "@mui/material";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const userLoggedIn = useAuth();

    useEffect(() => {
        if (userLoggedIn) {
            navigate("/restaurant");
        }
    }, [userLoggedIn]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [telephone, setTelephone] = useState("");

    const dispatch = useAppDispatch();

    return (
        <>
            <Box component="form">
                <TextField
                    error={true}
                    id="outlined-error"
                    label="error"
                    defaultValue="Hello World"
                />
            </Box>
        </>
    );
};

export default RegistrationPage;
