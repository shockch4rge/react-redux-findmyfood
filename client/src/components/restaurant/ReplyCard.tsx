import { Box, Card, Container, Avatar, Typography, Divider } from "@mui/material";
import { useGetUserQuery } from "../../app/services/users";
import { ReplyData } from "../../models/Reply";

interface Props {
    reply: ReplyData;
}

const ReplyCard = ({ reply }: Props) => {
    const { isLoading: userLoading, data: user } = useGetUserQuery(reply.userId);

    return (
        <Box display="flex" justifyContent="flex-end">
            <Card
                sx={{
                    width: "80%",
                    display: "flex",
                    height: "fit-content",
                    borderRadius: 3,
                    p: 1,
                }}
            >
                <Container sx={{ width: "fit-content" }}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Avatar sx={{ width: 50, height: 50, mb: 1 }} src={user?.avatarPath} />
                    </Box>
                    <Typography textAlign="center">{user?.username}</Typography>
                </Container>
                <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 3 }} />
                <Box width="100%">
                    <Typography variant="body2" fontSize={16}>
                        {reply.content}
                    </Typography>
                    <Typography
                        m={1}
                        textAlign="end"
                        sx={{
                            fontFamily: "GalyonBook",
                            fontStyle: "italic",
                        }}
                    >
                        {reply.isEdited ? "Edited" : "Posted"} {reply.timestamp}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default ReplyCard;
