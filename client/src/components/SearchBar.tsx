import { IconButton, Paper, Input, Autocomplete, TextField, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { RestaurantData } from "../models/Restaurant";

interface DesktopSearchBarProps {
    restaurants: RestaurantData[];
}

export const DesktopSearchBar = ({ restaurants }: DesktopSearchBarProps) => {
    const navigate = useNavigate();

    const handleSearchQueryChange = (_: React.SyntheticEvent, value: string) => {
        const restaurantId = restaurants.find(r => r.name === value)!.id;
        navigate(`/restaurant/${restaurantId}`);
    };

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
            }}>
            <Autocomplete
                sx={{ border: "none" }}
                disablePortal
                fullWidth
                placeholder="Search for a restaurant here!"
                options={restaurants.map(r => r.name)}
                onChange={handleSearchQueryChange}
                renderInput={params => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
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
