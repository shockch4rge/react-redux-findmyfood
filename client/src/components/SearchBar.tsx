import {
    IconButton,
    Paper,
    Divider,
    Typography,
    TextField,
    Input,
    SxProps,
    Theme,
    Container,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

interface DesktopSearchBarProps {
    onQueryChange: (value: string) => void;
}

export const DesktopSearchBar = ({ onQueryChange }: DesktopSearchBarProps) => {
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
            <Input
                disableUnderline
                fullWidth
                placeholder={"Search for a restaurant here...."}
                onChange={e => onQueryChange(e.target.value)}
            />
        </Paper>
    );
};

export const MobileSearchBar = () => {
    return (
        <Paper component="form" sx={{ px: 1, display: { xs: "flex", md: "none" }, mt: 3 }}>
            <IconButton onClick={() => {}} sx={{ mr: 1.5 }}>
                <SearchIcon />
            </IconButton>
            <Input
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
