import { Dialog, DialogTitle, DialogContent, Stack, Box, InputLabel, TextField, Rating, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import { setShowWriteReviewDialog, setWriteReviewDialogPayload } from "../../app/slices/dialogs";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

const WriteReviewDialog = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(state => state.ui.dialogs.writeReview.show);

    const titleId = "write-review-dialog-title";
    const contentId = "write-review-dialog-content";
    const ratingId = "write-review-dialog-rating";

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(1);

    const [isValidTitle, setIsValidTitle] = useState(false);
    const [isValidContent, setIsValidContent] = useState(false);

    return (
        <Dialog open={open} onClose={() => console.log("dialog closed")} fullWidth>
            <DialogTitle>Write a review</DialogTitle>
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
                            placeholder="Describe your experience at the restaurant. Be descriptive!"
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
                <Button onClick={() => dispatch(setShowWriteReviewDialog(false))}>Cancel</Button>
                <Button
                    disabled={!isValidTitle || !isValidContent}
                    onClick={() => {
                        dispatch(setShowWriteReviewDialog(false));
                        dispatch(
                            setWriteReviewDialogPayload({
                                title,
                                content,
                                rating,
                            })
                        );
                    }}
                >
                    Post
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WriteReviewDialog