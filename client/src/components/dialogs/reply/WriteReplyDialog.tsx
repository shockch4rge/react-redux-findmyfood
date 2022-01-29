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
import { useAddReplyMutation } from "../../../app/services/replies";
import { setShowWriteReplyDialog } from "../../../app/slices/ui/dialogs/replyDialog";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { timestamp } from "../../../utilities/timestamp";

interface Props {
    reviewId: string;
    onPost: () => void;
}

const WriteReplyDialog = ({ reviewId, onPost }: Props) => {
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
            <DialogTitle>Write a reply</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
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
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setShowWriteReplyDialog(false))}>Cancel</Button>
                <Button
                    disabled={!isValidContent}
                    onClick={() => {
                        addReply({
                            reviewId,
                            userId: user!.id,
                            content,
                            timestamp: timestamp(),
                        })
                            .then(() => {
                                dispatch(setShowWriteReplyDialog(false));
                                onPost();
                            })
                            .catch(console.log);
                    }}
                >
                    Post
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WriteReplyDialog;
