import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import { setShowDeleteReviewDialog } from "../../../app/slices/ui/dialogs/reviewDialog";
import { useDeleteReviewMutation } from "../../../app/services/reviews";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { createSnack } from "../../../app/slices/ui/snackbars/snack";

interface Props {
    reviewId: string;
}

const DeleteReviewDialog = ({ reviewId }: Props) => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(state => state.ui.dialogs.review.delete.show);
    const [deleteReview, { isLoading }] = useDeleteReviewMutation();

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>Are you sure you want to delete this review?</DialogTitle>
            <DialogContent>{isLoading && <CircularProgress />}</DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setShowDeleteReviewDialog(false))}>Cancel</Button>
                <Button
                    color="error"
                    onClick={async () => {
                        try {
                            await deleteReview(reviewId).unwrap();
                            dispatch(setShowDeleteReviewDialog(false));
                            dispatch(
                                createSnack({
                                    message: "Review deleted!",
                                    severity: "success",
                                })
                            );
                        } catch (err) {
                            console.log(err);
                            dispatch(
                                createSnack({
                                    message: "Error deleting review.",
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

export default DeleteReviewDialog;
