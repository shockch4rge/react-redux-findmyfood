import {
    IconButton,
    Paper,
    Divider,
    Typography,
    TextField,
    InputBase,
    SxProps,
    Theme,
    Container,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

export const DesktopSearchBar = () => {
    return (
        <Paper
            component="form"
            elevation={0}
            sx={{
                width: "60%",
                height: "fit-content",
                display: "flex",
                alignItems: "center",
                borderRadius: 3,
            }}
        >
            <IconButton>
                <SearchIcon />
            </IconButton>
            <InputBase fullWidth placeholder={"Search for a restaurant here...."} />
        </Paper>
    );
};

export const MobileSearchBar = () => {
    return (
        <Paper component="form" sx={{px: 1, display: { xs: "flex", md: "none" }, mt: 3 }}>
            <IconButton onClick={() => {}} sx={{ mr: 1.5 }}>
                <SearchIcon />
            </IconButton>
            <InputBase
                fullWidth
                placeholder={"Search for a restaurant here...."}
                sx={{ fontFamily: theme => theme.typography.body2 }}
            />
            <IconButton onClick={() => {}}>
                <FilterListIcon />
            </IconButton>
        </Paper>
    );
};
