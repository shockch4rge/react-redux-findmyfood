import {
    Dialog,
    DialogTitle,
    DialogContent,
    Stack,
    Box,
    InputLabel,
    TextField,
    Rating,
    DialogActions,
    Button,
} from "@mui/material";
import { useState, useCallback } from "react";
import { useAddReviewMutation } from "../../../app/services/reviews";
import { setShowWriteReviewDialog } from "../../../app/slices/ui/dialogs/reviewDialog";
import { createSnack } from "../../../app/slices/ui/snackbars/snack";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { timestamp } from "../../../utilities/timestamp";

interface Props {
    restaurantId: string;
}

const WriteReviewDialog = ({ restaurantId }: Props) => {
    const dispatch = useAppDispatch();
    const [addReview] = useAddReviewMutation();
    const user = useAppSelector(state => state.auth);
    const open = useAppSelector(state => state.ui.dialogs.review.write.show);

    const titleId = "write-review-dialog-title";
    const contentId = "write-review-dialog-content";
    const ratingId = "write-review-dialog-rating";

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(1);

    const [isValidTitle, setIsValidTitle] = useState<boolean | null>(null);
    const [isValidContent, setIsValidContent] = useState<boolean | null>(null);

    const handleOnClose = () => {
        setTitle("");
        setContent("");
        setRating(1);
        setIsValidContent(null);
        setIsValidTitle(null);
    };

    const onWriteButtonClick = async () => {
        try {
            await addReview({
                restaurantId,
                userId: user!.id,
                rating,
                title,
                content,
                timestamp: timestamp(),
            }).unwrap();
            dispatch(setShowWriteReviewDialog(false));
            dispatch(
                createSnack({
                    message: "Review posted!",
                    severity: "success",
                })
            );
        } catch (err) {
            console.log(err);
            dispatch(
                createSnack({
                    message: "Error posting review.",
                    severity: "error",
                })
            );
        }
    };

    return (
        <Dialog open={open} onClose={handleOnClose} fullWidth>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <Box>
                        <InputLabel htmlFor={titleId}>Title*</InputLabel>
                        <TextField
                            autoFocus
                            id={titleId}
                            name="title"
                            type="text"
                            fullWidth
                            required
                            variant="standard"
                            placeholder="Summarise your review!"
                            onChange={({ target: { value } }) => {
                                setTitle(value);
                                setIsValidTitle(value.length >= 10 && value.length <= 55);
                            }}
                            error={isValidTitle !== null && !isValidTitle}
                            helperText={"10-50 characters"}
                        />
                    </Box>

                    <Box>
                        <InputLabel htmlFor={contentId}>Content*</InputLabel>
                        <TextField
                            multiline
                            rows={5}
                            id={contentId}
                            name="content"
                            fullWidth
                            required
                            placeholder="Describe your experience at the restaurant. Be descriptive!"
                            onChange={({ target: { value } }) => {
                                setContent(value);
                                setIsValidContent(value.length >= 20 && value.length <= 250);
                            }}
                            error={isValidContent !== null && !isValidContent}
                            helperText={"20-250 characters"}
                        />
                    </Box>

                    <Box>
                        <InputLabel htmlFor={ratingId}>Rating*</InputLabel>
                        <Rating
                            id={ratingId}
                            precision={0.5}
                            value={rating}
                            onChange={(_, newRating) => setRating(newRating!)}
                        />
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setShowWriteReviewDialog(false))}>Cancel</Button>
                <Button disabled={!isValidTitle || !isValidContent} onClick={onWriteButtonClick}>
                    Post
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WriteReviewDialog;
