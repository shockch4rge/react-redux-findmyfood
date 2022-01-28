import AddIcon from "@mui/icons-material/Add";
import { Card, Container, Box, Avatar, Typography, Divider, Rating, Button } from "@mui/material";
import { useGetUserAvatarQuery } from "../../app/services/images";
import { useGetReviewRepliesQuery } from "../../app/services/replies";
import { useGetUserQuery } from "../../app/services/users";
import Reply, { ReplyData } from "../../models/Reply";
import { ReviewData } from "../../models/Review";
import User from "../../models/User";
import ReplyCard from "./ReplyCard";

interface Props {
    review: ReviewData;
}

const ReviewCard = ({ review }: Props) => {
    const { isLoading: userLoading, data: user } = useGetUserQuery(review.userId);
    const { isLoading: repliesLoading, data: replies } = useGetReviewRepliesQuery(review.id);

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
                        <Avatar sx={{ width: 80, height: 80, mb: 1 }} />
                    </Box>
                    <Typography textAlign="center">{user?.username}</Typography>
                </Container>
                <Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 4 }} />
                <Box width="100%">
                    <Typography variant="h5">{review.title}</Typography>
                    <Rating readOnly value={review.rating} precision={0.5} sx={{ my: 1 }} />
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
                    <Button onClick={() => {}} startIcon={<AddIcon />}>
                        Add Reply
                    </Button>
                </Box>
            </Card>
            {replies?.slice(0, 2).map(reply => (
                <ReplyCard reply={reply} />
            ))}
        </>
    );
};

export default ReviewCard;
