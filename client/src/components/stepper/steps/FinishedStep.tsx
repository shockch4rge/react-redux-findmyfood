import { Grow, Container, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../app/services/users";
import { userLoggedIn } from "../../../app/slices/auth";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { UserData } from "../../../models/User";
import DoneIcon from "@mui/icons-material/Done";
import { Nullable } from "../../../utilities/Nullable";

interface Props {
    userCredentials: Nullable<Omit<UserData, "id">>;
}

const FinishedStep = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [registerUser] = useRegisterUserMutation();

    useEffect(() => {
        registerUser(props.userCredentials)
            .unwrap()
            .then(user => dispatch(userLoggedIn(user)))
            .catch(console.log);

        const redirect = setTimeout(() => {
            navigate("/home");
        }, 5000);

        return () => clearTimeout(redirect);
    }, []);

    return (
        <Grow in timeout={1000}>
            <Container
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 5,
                    boxShadow: "var(--shadow-elevation-medium)",
                    width: { xs: 250, md: "60%" },
                    height: { xs: 260, md: 275 },
                }}
            >
                <Grow in timeout={2000}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box
                            sx={{
                                backgroundImage: "var(--gradient)",
                                borderRadius: "50%",
                                mt: { xs: 5, md: 4 },
                                width: { xs: 50, md: 75 },
                                height: { xs: 50, md: 75 },
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <DoneIcon
                                sx={{ color: theme => theme.palette.common.white }}
                                fontSize="large"
                            />
                        </Box>
                    </Box>
                </Grow>
                <Grow in timeout={2000}>
                    <Typography sx={{ mt: 3, textAlign: "center", fontSize: { xs: 16, md: 20 } }}>
                        Thanks for registering! You'll be redirected to the home page soon.
                    </Typography>
                </Grow>
            </Container>
        </Grow>
    );
};

export default FinishedStep;
