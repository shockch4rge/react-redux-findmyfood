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
import { useEditReplyMutation } from "../../../app/services/replies";
import { setShowEditReplyDialog } from "../../../app/slices/ui/dialogs/replyDialog";
import { createSnack } from "../../../app/slices/ui/snackbars/snack";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ReplyData } from "../../../models/Reply";
import { timestamp } from "../../../utilities/timestamp";

interface Props {
    reply: ReplyData;
    onPost: () => void;
}

const EditReplyDialog = ({ reply, onPost }: Props) => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(state => state.ui.dialogs.reply.edit.show);
    const [editReply] = useEditReplyMutation();

    const contentId = "edit-reply-dialog-content";

    const [content, setContent] = useState(reply.content);

    const [isValidContent, setIsValidContent] = useState(false);

    const handleOnClose = () => {
        setContent(reply.content);
        setIsValidContent(false);
    };

    return (
        <Dialog open={open} onClose={handleOnClose} fullWidth>
            <DialogTitle>Edit your reply</DialogTitle>
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
                            value={content}
                            onChange={({ target: { value } }) => {
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
                <Button onClick={() => dispatch(setShowEditReplyDialog(false))}>Cancel</Button>
                <Button
                    disabled={!isValidContent}
                    onClick={async () => {
                        try {
                            await editReply({
                                id: reply.id,
                                content,
                                timestamp: timestamp(),
                                isEdited: true,
                            }).unwrap();
                            dispatch(setShowEditReplyDialog(false));
                            dispatch(
                                createSnack({
                                    message: "Reply edited!",
                                    severity: "success",
                                })
                            );
                            onPost();
                        } catch (err) {
                            console.log(err);
                            dispatch(
                                createSnack({
                                    message: "Error editing reply.",
                                    severity: "error",
                                })
                            );
                        }
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditReplyDialog;
