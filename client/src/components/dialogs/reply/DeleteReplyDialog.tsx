import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import { setShowDeleteReplyDialog } from "../../../app/slices/ui/dialogs/replyDialog";
import { useDeleteReplyMutation } from "../../../app/services/replies";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { createSnack } from "../../../app/slices/ui/snackbars/snack";

interface Props {
    replyId: string;
}

const DeleteReplyDialog = ({ replyId }: Props) => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(state => state.ui.dialogs.reply.delete.show);
    const [deleteReply, { isLoading }] = useDeleteReplyMutation();

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>Are you sure you want to delete this reply?</DialogTitle>
            <DialogContent>{isLoading && <CircularProgress />}</DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setShowDeleteReplyDialog(false))}>Cancel</Button>
                <Button
                    color="error"
                    onClick={async () => {
                        try {
                            await deleteReply(replyId).unwrap();
                            dispatch(setShowDeleteReplyDialog(false));
                            dispatch(
                                createSnack({
                                    message: "Reply deleted!",
                                    severity: "success",
                                })
                            );
                        } catch (err) {
                            console.log(err);
                            dispatch(
                                createSnack({
                                    message: "Error deleting reply.",
                                    severity: "error",
                                })
                            );
                        }
                    }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteReplyDialog;
