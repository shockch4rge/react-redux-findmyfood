import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Grow,
    Stack,
    Typography,
    Paper,
    Avatar,
    Input,
    TextField,
    Grid,
    InputAdornment,
    IconButton,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    InputLabel,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRegisterUserMutation } from "../app/services/users";
import { userLoggedIn } from "../app/slices/auth/auth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { AuthHelper } from "../utilities/AuthHelper";
import User, { UserData } from "../models/User";
import CustomStepper from "../components/common/CustomStepper";
import camelcase from "camelcase";
import { useDispatch } from "react-redux";
import { setProfileStepPayload } from "../app/slices/ui/steps";
import { useAppSelector } from "../hooks/useAppSelector";

type CredentialsChangeHandler = ({
    target: { name, value },
}: React.ChangeEvent<HTMLInputElement>) => void;

const RegistrationPage = () => {
    const [stepNumber, setStepNumber] = useState(0);
    const [userInfo, setUserInfo] = useState<UserData>(User.getEmpty());

    const profileInfo = useAppSelector(state => state.ui.steps.profile.payload);
    const accountInfo = useAppSelector(state => state.ui.steps.account.payload);

    const handleCredentialsChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const steps = ["Public Profile", "Account Info", "Finish!"];

    useEffect(() => {
        setUserInfo(prev => ({ ...prev, ...profileInfo, ...accountInfo }));
    }, [profileInfo, accountInfo]);

    return (
        <>
            <Container maxWidth="md">
                <CustomStepper sx={{ mt: "10%" }} steps={steps} activeStep={stepNumber} />;
                <Box sx={{ height: 400, mt: 10 }}>
                    {stepNumber === 0 && (
                        <PublicProfileStep handleCredentialsChange={handleCredentialsChange} />
                    )}
                    {stepNumber === 1 && (
                        <AccountInfoStep handleCredentialsChange={handleCredentialsChange} />
                    )}
                    {stepNumber === 2 && <FinishedStep userCredentials={userInfo} />}
                </Box>
                <Box
                    sx={{
                        mt: 5,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        onClick={() => setStepNumber(prev => prev - 1)}
                        disabled={stepNumber < 1}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => setStepNumber(prev => prev + 1)}
                        disabled={stepNumber > 1}
                    >
                        {stepNumber === 1 ? "Submit" : "Next"}
                    </Button>
                </Box>
            </Container>
        </>
    );
};

interface PublicProfileStepProps {
    handleCredentialsChange: CredentialsChangeHandler;
}

const PublicProfileStep = ({ handleCredentialsChange }: PublicProfileStepProps) => {
    const fields = ["Username", "First Name", "Last Name"];
    const genderButtonLabels = ["Male", "Female", "Other"];

    const [formData] = useState(new FormData());
    const [avatarPreviewUri, setAvatarPreviewUri] = useState<string | ArrayBuffer | null>(null);

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const avatarKey = "avatar";

        if (formData.has(avatarKey)) {
            // replace the existing avatar key if it exists
            formData.delete(avatarKey);
        }

        const reader = new FileReader();
        const file = e.target.files![0];

        // define cb for when file is successfully read
        reader.onload = ev => {
            setAvatarPreviewUri(ev.target!.result);
            // append the file to the FormData to send to the server later
            formData.append(avatarKey, file);
        };

        // start reading the file, which will call onload on success.
        reader.readAsDataURL(file);
    };

    return (
        <Box mt={4} display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
            <Paper
                elevation={3}
                sx={{
                    height: 240,
                    width: 200,
                    padding: 2,
                    mt: 4,
                    mx: 3,
                    border: "4px solid #8bf84c",
                    borderRadius: 3,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Stack spacing={2}>
                    <Container>
                        <Avatar
                            src={avatarPreviewUri?.toString() ?? "https://bit.ly/3qcZQsm"}
                            sx={{
                                ml: 2.5,
                                width: { xs: 120, md: 150 },
                                height: { xs: 120, md: 150 },
                            }}
                        />
                        <Input
                            id="avatar-upload"
                            type="file"
                            value=""
                            onChange={handleAvatarUpload}
                        />
                        <InputLabel htmlFor="avatar-upload">Upload a profile picture!</InputLabel>
                    </Container>
                </Stack>
            </Paper>
            <Stack
                spacing={2}
                sx={{ mx: 3, justifyContent: "center", alignItems: "center", mt: 4 }}
            >
                {fields.map(field => (
                    <TextField
                        autoComplete="off"
                        label={field}
                        key={field}
                        type="text"
                        name={camelcase(field)}
                        onChange={handleCredentialsChange}
                    />
                ))}
                <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="gender-single-choice-buttons"
                        name="radio-buttons-group"
                    >
                        {genderButtonLabels.map(label => (
                            <FormControlLabel
                                value={label.toLowerCase()}
                                control={<Radio size="small" />}
                                label={label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Stack>
        </Box>
    );
};

interface AccountInfoStepProps {
    handleCredentialsChange: CredentialsChangeHandler;
}

const AccountInfoStep = ({ handleCredentialsChange }: AccountInfoStepProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box>
            <Grid container rowSpacing={2}>
                <Grid item xs={6} display="flex" justifyContent="center">
                    <TextField
                        autoComplete="off"
                        label="Email"
                        type="text"
                        name="email"
                        onChange={handleCredentialsChange}
                    />
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="center">
                    <TextField
                        autoComplete="off"
                        label="Address"
                        type="text"
                        name="address"
                        onChange={handleCredentialsChange}
                    />
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="center">
                    <TextField
                        autoComplete="off"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleCredentialsChange}
                        error={!AuthHelper.isPassword(credentials.password)}
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
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="center">
                    <TextField label="Telephone" type="text" onChange={handleCredentialsChange} />
                </Grid>
            </Grid>
        </Box>
    );
};

interface FinishedStepProps {
    userCredentials: UserData;
}

const FinishedStep = ({ userCredentials }: FinishedStepProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [registerUser] = useRegisterUserMutation();

    useEffect(() => {
        registerUser(userCredentials)
            .unwrap()
            .then(user => dispatch(userLoggedIn(user)))
            .catch(console.log);

        const redirect = setTimeout(() => {
            navigate("/home");
        }, 5000);

        // clear redirect timeout if user clicked 'previous' or exited the page
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

export default RegistrationPage;
