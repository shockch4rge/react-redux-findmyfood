import { Dialog, DialogTitle, DialogContent, CircularProgress, DialogActions, Button } from "@mui/material";
import { setShowDeleteUserDialog } from "../../../app/slices/ui/dialogs/userDialog";
import { useDeleteUserMutation } from "../../../app/services/users";
import { createSnack } from "../../../app/slices/ui/snackbars/snack";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../../app/slices/auth/auth";

interface Props {
    userId: string;
}

const DeleteAccountDialog = ({ userId }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const open = useAppSelector(state => state.ui.dialogs.user.delete.show);
    const [deleteUser, { isLoading }] = useDeleteUserMutation();

    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
            <DialogContent>{isLoading && <CircularProgress />}</DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(setShowDeleteUserDialog(false))}>Cancel</Button>
                <Button
                    color="error"
                    onClick={async () => {
                        try {
                            await deleteUser(userId).unwrap();
                            dispatch(userLoggedOut());
                            dispatch(setShowDeleteUserDialog(false));
                            dispatch(
                                createSnack({
                                    message: "Successfully deleted your account!",
                                    severity: "success",
                                })
                            );
                            navigate("/home");
                        } catch (err) {
                            dispatch(
                                createSnack({
                                    message: "There was an error deleting your account.",
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

export default DeleteAccountDialog;
