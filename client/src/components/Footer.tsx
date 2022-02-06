import { Box, Typography, Stack, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    return (
        <Box
            mt={30}
            width="100%"
            height={150}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ background: "#2F2F2F" }}>
            <Stack direction="row" spacing={3}>
                <IconButton onClick={() => window.open("https://github.com/Shockch4rge/react-redux-findmyfood")}>
                    <GitHubIcon fontSize="large"/>
                </IconButton>
            </Stack>

        </Box>
    );
};

export default Footer;
