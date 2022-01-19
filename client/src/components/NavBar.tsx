import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ButtonData {
    label: string;
    onClick: (value?: string) => void;
}

const settingsButtons = ["Profile", "Settings", "Sign Out"];

const NavBar = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { user } = useAuth();

    // #region nav bar buttons
    const pageButtons = [
        {
            label: "Home",
            onClick: () => navigate("/home"),
        },
        {
            label: "About",
            onClick: () => navigate("/about"),
        },
    ] as ButtonData[];

    const settingsButtons = [
        {
            label: "Profile",
            onClick: () => navigate("/profile"),
        },
        {
            label: "Settings",
            onClick: () => navigate("/settings"),
        },
        {
            label: "Sign Out",
            onClick: () => navigate("/logOut"),
        },
    ] as ButtonData[];
    // #endregion

    // #region handlers
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // #endregion

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{
                            fontFamily: "GalyonBold",
                            fontWeight: "bold",
                            background: "var(--gradient)",
                            display: { xs: "none", md: "flex" },
                            "-webkit-background-clip": "text",
                            "-webkit-text-fill-color": "transparent",
                        }}
                    >
                        FindMyFood!
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={!!anchorElNav}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pageButtons.map(button => (
                                <MenuItem key={button.label} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{button.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                        FindMyFood!
                    </Typography>
                    <Box ml={10} sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pageButtons.map(button => (
                            <Button
                                key={button.label}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    button.onClick();
                                }}
                                sx={{ my: 2, display: "block" }}
                            >
                                {button.label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        size="large"
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://picsum.photos/seed/picsum/536/354"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate("/login")}>Log In</Button>
                                <Button>Sign Up</Button>
                            </>
                        )}

                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={!!anchorElUser}
                            onClose={handleCloseUserMenu}
                        >
                            {settingsButtons.map(button => (
                                <MenuItem
                                    key={button.label}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        button.onClick();
                                    }}
                                >
                                    <Typography textAlign="center">{button.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
