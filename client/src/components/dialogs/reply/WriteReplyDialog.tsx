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
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useAddReplyMutation } from "../../../app/services/replies";
import { setShowWriteReplyDialog } from "../../../app/slices/ui/dialogs/replyDialog";
import { createSnack } from "../../../app/slices/ui/snackbars/snack";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ReviewData } from "../../../models/Review";
import { timestamp } from "../../../utilities/timestamp";
import Snack from "../../common/Snack";

interface Props {
    review: ReviewData;
}

const WriteReplyDialog = ({ review }: Props) => {
    const dispatch = useAppDispatch();
    const [addReply] = useAddReplyMutation();
    const user = useAppSelector(state => state.auth);
    const open = useAppSelector(state => state.ui.dialogs.reply.write.show);

    const contentId = "write-reply-dialog-content";

    const [content, setContent] = useState("");
    const [isValidContent, setIsValidContent] = useState(false);

    const handleOnClose = () => {
        setContent("");
        setIsValidContent(false);
    };

    return (
        <Dialog open={open} onClose={handleOnClose} fullWidth>
            <DialogTitle>Write a Reply</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography component="label">Review Title:</Typography>
                            <Typography id="review-to-reply-title" variant="body2">
                                {review.title}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography component="label">Review Content:</Typography>
                            <Typography id="review-to-reply-content" variant="body2">
                                {review.content}
                            </Typography>
                        </Box>
                    </Stack>
                    <Box>
                        <InputLabel htmlFor={contentId}>Your reply*</InputLabel>
                        <TextField
                            multiline
                            rows={4}
                            id={contentId}
                            name="content"
                            fullWidth
                            required
                            placeholder="Be respectful to the reviewer!"
                            onChange={({ target: { value } }) => {
                                setContent(value);
                                setIsValidContent(value.length >= 20 && value.length <= 200);
                            }}
                            error={!isValidContent}
                            helperText={"20-250 characters"}
                        />
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setShowWriteReplyDialog(false))}>Cancel</Button>
                <Button
                    disabled={!isValidContent}
                    onClick={async () => {
                        try {
                            await addReply({
                                reviewId: review.id,
                                userId: user!.id,
                                content,
                                timestamp: timestamp(),
                            });
                            dispatch(setShowWriteReplyDialog(false));
                            dispatch(
                                createSnack({
                                    message: "Reply posted!",
                                    severity: "success",
                                })
                            );
                        } catch (err) {
                            console.log(err);
                            dispatch(
                                createSnack({
                                    message: "Error posting reply.",
                                    severity: "error",
                                })
                            );
                        }
                    }}>
                    Post
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WriteReplyDialog;
