import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
} from "@mui/material";
import { setShowDeleteReviewDialog } from "../../app/slices/ui/dialogs";
import { useDeleteReviewMutation } from "../../app/services/reviews";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface Props {
    reviewId: string;
}

const DeleteReviewDialog = ({ reviewId }: Props) => {
    const [deleteReview, { isLoading }] = useDeleteReviewMutation();
    const open = useAppSelector(state => state.ui.dialogs.deleteReview.show);
    const dispatch = useAppDispatch();

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>Are you sure you want to delete this review?</DialogTitle>
            <DialogContent>{isLoading && <CircularProgress />}</DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setShowDeleteReviewDialog(false))}>Cancel</Button>
                <Button
                    color="error"
                    onClick={() => {
                        deleteReview(reviewId).then(() => dispatch(setShowDeleteReviewDialog(false)));
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteReviewDialog;
