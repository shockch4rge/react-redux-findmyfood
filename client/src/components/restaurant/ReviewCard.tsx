import AddIcon from "@mui/icons-material/Add";
import { Card, Container, Box, Avatar, Typography, Divider, Rating, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetReviewRepliesQuery } from "../../app/services/replies";
import { useGetUserQuery } from "../../app/services/users";
import { setShowLoginDialog } from "../../app/slices/ui/dialogs/userDialog";
import { setShowWriteReplyDialog } from "../../app/slices/ui/dialogs/replyDialog";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ReviewData } from "../../models/Review";
import WriteReplyDialog from "../dialogs/reply/WriteReplyDialog";
import ReplyCard from "./ReplyCard";

interface Props {
    review: ReviewData;
}

const ReviewCard = ({ review }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // get the current/logged in user from the store
    const activeUser = useAppSelector(state => state.auth);
    // get the replies to this review
    const { data: replies } = useGetReviewRepliesQuery(review.id);
    // get the poster of this review
    const { isLoading: userLoading, data: poster } = useGetUserQuery(review.userId);

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    height: "fit-content",
                    borderRadius: 3,
                    p: 3,
                }}>
                <Container sx={{ width: "fit-content" }}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Avatar sx={{ width: 80, height: 80, mb: 1 }} src={poster?.avatarPath} />
                    </Box>
                    <Typography textAlign="center">{poster?.username}</Typography>
                </Container>
                <Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 4 }} />
                <Box width="100%">
                    <Typography variant="h5">{review.title}</Typography>
                    <Rating readOnly value={+review.rating} precision={0.5} sx={{ my: 1 }} />
                    <Typography mb={2} variant="body2" fontSize={16}>
                        {review.content}
                    </Typography>
                    <Typography
                        m={1}
                        textAlign="end"
                        variant="body2"
                        display={{ xs: "none", md: "block" }}
                        sx={{ position: "relative", top: 40, right: 10 }}>
                        {review.isEdited ? "Edited" : "Posted"} on {review.timestamp.split("T")[0]}
                    </Typography>

                    {/* active user is logged in and review isn't posted by them */}
                    {activeUser && review.userId !== activeUser.id ? (
                        <Box>
                            <Button
                                onClick={() => dispatch(setShowWriteReplyDialog(true))}
                                startIcon={<AddIcon />}>
                                Add Reply
                            </Button>

                            <WriteReplyDialog review={review} />
                        </Box>
                    ) : // active user is logged in and review is posted by them
                    activeUser && review.userId === activeUser.id ? (
                        <Button variant="text" disabled={true}>
                            You can't reply to your own reviews!
                        </Button>
                    ) : (
                        <Button onClick={() => dispatch(setShowLoginDialog(true))}>Sign in to reply!</Button>
                    )}
                </Box>
            </Card>
            {replies && replies.map(reply => <ReplyCard key={reply.id} reply={reply} />)}
        </>
    );
};

export default ReviewCard;
