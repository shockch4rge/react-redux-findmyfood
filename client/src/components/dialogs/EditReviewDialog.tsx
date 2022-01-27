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
import { useState } from "react";
import { setShowEditReviewDialog, setEditReviewDialogPayload } from "../../app/slices/ui/dialogs";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ReviewData } from "../../models/Review";

interface Props {
    review: ReviewData;
}

const EditReviewDialog = ({ review }: Props) => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(state => state.ui.dialogs.editReview.show);

    const titleId = "edit-review-dialog-title";
    const contentId = "edit-review-dialog-content";
    const ratingId = "edit-review-dialog-rating";

    const [title, setTitle] = useState(review.title);
    const [content, setContent] = useState(review.content);
    const [rating, setRating] = useState(review.rating);

    const [isValidTitle, setIsValidTitle] = useState(false);
    const [isValidContent, setIsValidContent] = useState(false);

    return (
        <Dialog open={open} onClose={() => console.log("dialog closed")} fullWidth>
            <DialogTitle>Edit your review</DialogTitle>
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
                            value={title}
                            onChange={e => {
                                const value = e.target.value;
                                setTitle(value);
                                setIsValidTitle(value.length >= 10 && value.length <= 55);
                            }}
                            error={!isValidTitle}
                            helperText={"10-50 characters"}
                        />
                    </Box>

                    <Box>
                        <InputLabel htmlFor={contentId}>Content*</InputLabel>
                        <TextField
                            multiline
                            id={contentId}
                            name="content"
                            fullWidth
                            required
                            value={content}
                            onChange={e => {
                                const value = e.target.value;
                                setContent(value);
                                setIsValidContent(value.length >= 20 && value.length <= 250);
                            }}
                            error={!isValidContent}
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
                <Button
                    onClick={() => {
                        // reset all to pre-edit
                        setTitle(review.title);
                        setContent(review.content);
                        setRating(review.rating);
                        setIsValidContent(false);
                        setIsValidTitle(false);
                        dispatch(setShowEditReviewDialog(false));
                    }}
                >
                    Cancel
                </Button>
                <Button
                    disabled={!isValidTitle || !isValidContent}
                    onClick={() => {
                        dispatch(setShowEditReviewDialog(false));
                        dispatch(
                            setEditReviewDialogPayload({
                                title,
                                content,
                                rating,
                            })
                        );
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditReviewDialog;
