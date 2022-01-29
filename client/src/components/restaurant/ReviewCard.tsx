import AddIcon from "@mui/icons-material/Add";
import {
    Card,
    Container,
    Box,
    Avatar,
    Typography,
    Divider,
    Rating,
    Button,
    Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetReviewRepliesQuery } from "../../app/services/replies";
import { useGetUserQuery } from "../../app/services/users";
import { setShowLoginDialog } from "../../app/slices/ui/dialogs/loginDialog";
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
    const userLoggedIn = useAppSelector(state => state.auth);
    const { isLoading: userLoading, data: user } = useGetUserQuery(review.userId);
    const { isLoading: repliesLoading, data: replies, refetch: refetchReplies } = useGetReviewRepliesQuery(review.id);

    const onPost = () => {
        refetchReplies();
    }

    return (
        <>
            <Card
                sx={{
                    width: "100%",
                    display: "flex",
                    height: "fit-content",
                    borderRadius: 3,
                    p: 2,
                }}
            >
                <Container sx={{ width: "fit-content" }}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Avatar sx={{ width: 80, height: 80, mb: 1 }} src={user?.avatarPath} />
                    </Box>
                    <Typography textAlign="center">{user?.username}</Typography>
                </Container>
                <Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 4 }} />
                <Box width="100%">
                    <Typography variant="h5">{review.title}</Typography>
                    <Rating readOnly value={+review.rating} precision={0.5} sx={{ my: 1 }} />
                    <Typography variant="body2" fontSize={16}>
                        {review.content}
                    </Typography>
                    <Typography
                        m={1}
                        textAlign="end"
                        sx={{ fontFamily: "GalyonBook", fontStyle: "italic" }}
                    >
                        {review.isEdited ? "Edited" : "Posted"} {review.timestamp}
                    </Typography>

                    {userLoggedIn ? (
                        <Button
                            variant="outlined"
                            onClick={() => dispatch(setShowWriteReplyDialog(true))}
                            startIcon={<AddIcon />}
                        >
                            Add Reply
                        </Button>
                    ) : (
                        <Button variant="outlined" onClick={() => dispatch(setShowLoginDialog(true))}>
                            Sign in to reply!
                        </Button>
                    )}
                </Box>
            </Card>
            {replies?.slice(0, 2).map(reply => (
                <ReplyCard key={reply.id} reply={reply} />
            ))}

            <WriteReplyDialog review={review} onPost={onPost}/>
        </>
    );
};

export default ReviewCard;
