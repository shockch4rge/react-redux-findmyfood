import { IconButton, Paper, Input, Autocomplete, TextField, InputAdornment, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { RestaurantData } from "../models/Restaurant";

interface DesktopSearchBarProps {
    restaurants: RestaurantData[];
}

export const DesktopSearchBar = ({ restaurants }: DesktopSearchBarProps) => {
    const navigate = useNavigate();

    const handleSearchQuerySelect = (_: React.SyntheticEvent, value: string) => {
        const restaurantId = restaurants.find(r => r.name === value)!.id;
        navigate(`/restaurant/${restaurantId}`);
    };

    return (
        <Autocomplete
            sx={{ border: "none", width: "60%", backgroundColor: "white", borderRadius: 1 }}
            disablePortal
            fullWidth
            autoHighlight
            options={restaurants.map(r => r.name)}
            onChange={handleSearchQuerySelect}
            renderInput={params => (
                <TextField
                    {...params}
                    placeholder="Search for a restaurant here!"
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
    );
};

interface MobileSearchBarProps {
    restaurants: RestaurantData[];
}

export const MobileSearchBar = ({ restaurants }: MobileSearchBarProps) => {
    const navigate = useNavigate();

    const handleSearchQuerySelect = (_: React.SyntheticEvent, value: string) => {
        const restaurantId = restaurants.find(r => r.name === value)!.id;
        navigate(`/restaurant/${restaurantId}`);
    };

    return (
        <Stack mt={5} direction="row" spacing={2} sx={{ display: { xs: "flex", md: "none" } }}>
            <Autocomplete
                disablePortal
                fullWidth
                autoHighlight
                placeholder="Search for a restaurant here!"
                options={restaurants.map(r => r.name)}
                onChange={handleSearchQuerySelect}
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
            <IconButton onClick={() => {}}>
                <FilterListIcon />
            </IconButton>
        </Stack>
    );
};
