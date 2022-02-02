import { Box, Card, Container, Avatar, Typography, Divider, Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useGetUserQuery } from "../../app/services/users";
import { ReplyData } from "../../models/Reply";
import { setShowDeleteReplyDialog, setShowEditReplyDialog } from "../../app/slices/ui/dialogs/replyDialog";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import EditReplyDialog from "../dialogs/reply/EditReplyDialog";

interface Props {
    reply: ReplyData;
}

const ReplyCard = ({ reply }: Props) => {
    const dispatch = useAppDispatch();
    // get the current/logged in user from the store
    const activeUser = useAppSelector(state => state.auth);
    // get the poster of this reply
    const { isLoading: posterLoading, data: poster } = useGetUserQuery(reply.userId);

    return (
        <Box display="flex" justifyContent="flex-end">
            <Card
                sx={{
                    width: "80%",
                    display: "flex",
                    height: "fit-content",
                    borderRadius: 3,
                    p: 1,
                }}>
                <Container sx={{ width: "fit-content" }}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Avatar sx={{ width: 50, height: 50, mb: 1 }} src={poster?.avatarPath} />
                    </Box>
                    <Typography textAlign="center">{poster?.username}</Typography>
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
                        }}>
                        {reply.isEdited ? "Edited" : "Posted"} {reply.timestamp}
                    </Typography>

                    {/* active user is logged in and reply is posted by them */}
                    {activeUser && reply.userId === activeUser.id && (
                        <Stack direction="row" spacing={2}>
                            <Button
                                size="small"
                                onClick={() => dispatch(setShowEditReplyDialog(true))}
                                startIcon={<EditIcon />}>
                                Edit Reply
                            </Button>
                            <Button
                                size="small"
                                onClick={() => dispatch(setShowDeleteReplyDialog(true))}
                                startIcon={<DeleteIcon />}>
                                Delete Reply
                            </Button>

                            <EditReplyDialog reply={reply} />
                        </Stack>
                    )}
                </Box>
            </Card>
        </Box>
    );
};

export default ReplyCard;
