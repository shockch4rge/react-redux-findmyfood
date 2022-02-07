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
import { useEffect, useState } from "react";
import { useLazyLoginUserQuery, useRegisterUserMutation, useUpdateUserMutation } from "../app/services/users";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { createSnack } from "../app/slices/ui/snackbars/snack";
import { useNavigate } from "react-router-dom";
import { AuthHelper } from "../utilities/AuthHelper";
import { Link as RouterLink } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { setShowDeleteUserDialog, setShowLoginDialog } from "../app/slices/ui/dialogs/userDialog";
import { userLoggedIn, userLoggedOut } from "../app/slices/auth/auth";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { UserData } from "../models/User";
import DeleteAccountDialog from "../components/dialogs/user/DeleteAccountDialog";

const ManageProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.auth);
    const [userInfo, setUserInfo] = useState<Omit<UserData, "id" | "password" | "activated">>({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone,
        address: user.address,
        gender: user.gender,
        avatarPath: user.avatarPath,
        username: user.username,
    });

    const [avatarPreviewUri, setAvatarPreviewUri] = useState(userInfo.avatarPath);

    const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
    const [isSubmittable, setIsSubmittable] = useState(false);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [updateUser] = useUpdateUserMutation();

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

            return checks.every(check => check) && AuthHelper.isEmail(userInfo.email);
        });
    }, [userInfo]);

    return (
        <>
            <NavBar />
            <Container>
                <Typography mt={6} variant="h2" textAlign="center">
                    FindMyFood!
                </Typography>
                <Typography variant="h5" textAlign="center">
                    Update your profile!
                </Typography>

                <Stack direction="row" spacing={3} mt={10}>
                    <Box
                        width="100%"
                        height={600}
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
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={userInfo.username}
                                onChange={handleFormChange}
                            />
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
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={userInfo.address}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Telephone"
                                name="telephone"
                                value={userInfo.telephone}
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
                                value={userInfo.email}
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

                        <Grid item xs={7}>
                            <Button
                                disabled={!isSubmittable}
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={async () => {
                                    try {
                                        const form = collateFormData();
                                        await updateUser({ id: user.id, form }).unwrap();
                                        dispatch(
                                            createSnack({
                                                message: `Profile updated! Please login again.`,
                                                severity: "success",
                                            })
                                        );
                                        navigate("/home");
                                        dispatch(userLoggedOut());
                                    } catch (err) {
                                        dispatch(createSnack({ message: err.data, severity: "error" }));
                                    }
                                }}>
                                Update Details
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button
                                variant="outlined"
                                color="error"
                                size="large"
                                fullWidth
                                onClick={() => dispatch(setShowDeleteUserDialog(true))}>
                                Delete Account
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Not supposed to be here? Return to the{" "}
                                <Link
                                    component={RouterLink}
                                    to="/home"
                                    onClick={() => dispatch(setShowLoginDialog(true))}>
                                    home page.
                                </Link>
                            </Typography>

                            <DeleteAccountDialog userId={user.id}/>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
            <Footer />
        </>
    );
};

export default ManageProfilePage;
