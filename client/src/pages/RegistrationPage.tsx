import {
    Container,
    TextField,
    Typography,
    Grid,
    Paper,
    Box,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Stack,
    InputAdornment,
    IconButton,
    Input,
    Avatar,
    Button,
    Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import User from "../models/User";
import { useEffect, useState } from "react";
import { useLazyLoginUserQuery, useRegisterUserMutation } from "../app/services/users";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { createSnack } from "../app/slices/ui/snackbars/snack";
import { useNavigate } from "react-router-dom";
import { AuthHelper } from "../utilities/AuthHelper";
import { Link as RouterLink } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { setShowLoginDialog } from "../app/slices/ui/dialogs/loginDialog";
import { userLoggedIn } from "../app/slices/auth/auth";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [userInfo, setUserInfo] = useState(User.getEmpty());

    const [avatarPreviewUri, setAvatarPreviewUri] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
    const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);
    const [isSubmittable, setIsSubmittable] = useState(false);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [register] = useRegisterUserMutation();
    const [login] = useLazyLoginUserQuery();

    const handleFormChange = ({ target: { name, value } }: any) => {
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];

        if (file) {
            setAvatarPreviewUri(URL.createObjectURL(file));
            setAvatarFile(file);
        }
    };

    const collateFormData = () => {
        const formData = new FormData();

        for (const [name, value] of Object.entries(userInfo)) {
            formData.append(name, value);
        }

        formData.append("avatar", avatarFile);

        return formData;
    };

    useEffect(() => {
        setIsSubmittable(() => {
            const checks: boolean[] = [];

            for (const key in userInfo) {
                checks.push(userInfo[key].length > 0);
            }

            return (
                checks.every(check => check) &&
                AuthHelper.isEmail(userInfo.email) &&
                AuthHelper.isPassword(userInfo.password)
            );
        });
    }, [userInfo]);

    return (
        <Container>
            <Typography mt={10} variant="h2" textAlign="center">
                FindMyFood!
            </Typography>
            <Typography variant="h5" textAlign="center">
                Register for a profile!
            </Typography>

            <Stack direction="row" spacing={3} mt={10}>
                <Box
                    width="100%"
                    height={500}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={5}
                    sx={{ border: theme => `3px solid ${theme.palette.primary.main}` }}>
                    <Stack spacing={1}>
                        <Avatar sx={{ width: 200, height: 200, mb: 3 }} src={avatarPreviewUri} />
                        <InputLabel htmlFor="avatar-upload">
                            <Input
                                id="avatar-upload"
                                type="file"
                                sx={{ display: "none" }}
                                onChange={handleAvatarUpload}
                            />
                            <Button variant="contained" size="large" component="span" fullWidth>
                                Upload Avatar
                            </Button>
                        </InputLabel>
                    </Stack>
                </Box>
                <Grid container columnSpacing={3}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="First Name" name="firstName" onChange={handleFormChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Last Name" name="lastName" onChange={handleFormChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Username" name="username" onChange={handleFormChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                id="gender-select"
                                label="Gender"
                                name="gender"
                                value={userInfo.gender}
                                onChange={handleFormChange}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Address" name="address" onChange={handleFormChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Telephone"
                            name="telephone"
                            type="tel"
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            error={isValidEmail !== null && !isValidEmail}
                            onChange={e => {
                                setIsValidEmail(AuthHelper.isEmail(e.target.value));
                                handleFormChange(e);
                            }}
                            helperText={
                                isValidEmail !== null && !isValidEmail && "Please enter a valid email."
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            error={isValidPassword !== null && !isValidPassword}
                            onChange={e => {
                                setIsValidPassword(AuthHelper.isPassword(e.target.value));
                                handleFormChange(e);
                            }}
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
                    <Grid item xs={12}>
                        <PasswordStrengthMeter
                            sections={[
                                {
                                    color: "#FF2100",
                                    valid: AuthHelper.hasLength(userInfo.password),
                                    criteria: "Is at least 8 characters long",
                                },
                                {
                                    color: "#FF4300",
                                    valid: AuthHelper.hasDigits(userInfo.password),
                                    criteria: "Contains at least 2 digits",
                                },
                                {
                                    color: "#FFC900",
                                    valid: AuthHelper.hasUpperCaseLetters(userInfo.password),
                                    criteria: "Contains at least 2 uppercase letters",
                                },
                                {
                                    color: "#0DFF00",
                                    valid: AuthHelper.hasSpecialCharacters(userInfo.password),
                                    criteria: "Contains at least 1 special character",
                                },
                            ]}
                            finalValidation={isValidPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            disabled={!isSubmittable}
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={async () => {
                                try {
                                    const form = collateFormData();
                                    await register(form).unwrap();
                                    const user = await login({
                                        email: userInfo.email,
                                        password: userInfo.password,
                                    }).unwrap();
                                    dispatch(userLoggedIn(user));
                                    dispatch(
                                        createSnack({
                                            message: `Welcome, ${userInfo.username}!`,
                                            severity: "success",
                                        })
                                    );
                                    navigate("/home");
                                } catch (err) {
                                    dispatch(createSnack({ message: err.data, severity: "error" }));
                                }
                            }}>
                            Register
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            Already have a profile?{" "}
                            <Link
                                component={RouterLink}
                                to="/home"
                                onClick={() => dispatch(setShowLoginDialog(true))}>
                                Login instead.
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};

export default RegistrationPage;
