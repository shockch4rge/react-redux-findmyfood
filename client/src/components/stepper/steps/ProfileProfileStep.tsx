import { Box, Paper, Stack, Container, Avatar, Typography, TextField } from "@mui/material";
import camelcase from "camelcase";

interface Props {
    handleFormChange: any;
}

const PublicProfileStep = (props: Props) => {
    const fields = ["First Name", "Last Name", "Username", "Gender"];
    const { handleFormChange } = props;

    return (
        <Box
            sx={{
                mt: 4,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    padding: 2,
                    mt: 4,
                    mx: 3,
                    height: 240,
                    width: 200,
                    border: "4px solid #8bf84c",
                    borderRadius: 3,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Stack spacing={2}>
                    <Container>
                        <Avatar
                            alt="placeholder profile creation image"
                            src="https://bit.ly/3qcZQsm"
                            sx={{
                                width: { xs: 120, md: 150 },
                                height: { xs: 120, md: 150 },
                            }}
                        />
                    </Container>
                    <Typography textAlign="center">Upload a profile picture!</Typography>
                </Stack>
            </Paper>
            <Stack
                spacing={2}
                sx={{ mx: 3, justifyContent: "center", alignItems: "center", mt: 4 }}
            >
                {fields.map(field => (
                    <TextField
                        autoComplete="off"
                        key={field}
                        label={field}
                        type="text"
                        name={camelcase(field)}
                        onChange={handleFormChange}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default PublicProfileStep;
