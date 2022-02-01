import { Box, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            <Box display="">
                <Typography variant="h1" textAlign="center">
                    404
                </Typography>
                <Typography variant="h5" textAlign="center">
                    Whoops! We couldn't find the page you were looking for.
                </Typography>
            </Box>
        </>
    );
};

export default PageNotFound;
