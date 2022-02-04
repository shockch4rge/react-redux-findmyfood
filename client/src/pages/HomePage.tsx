import { useAppDispatch } from "../hooks/useAppDispatch";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Container,
    Grid,
    Button,
    SxProps,
    Theme,
    Stack,
    Rating,
    Chip,
    Grow,
    Fade,
} from "@mui/material";
import NavBar from "../components/NavBar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Restaurant, { RestaurantData } from "../models/Restaurant";
import { DesktopSearchBar, MobileSearchBar } from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useGetAllRestaurantsQuery } from "../app/services/restaurants";
import HomePageSkeleton from "../components/skeletons/HomePageSkeleton";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface ButtonData {
    label: string;
    onClick: () => void;
}

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data: restaurants, isLoading: restaurantsLoading, error } = useGetAllRestaurantsQuery();

    // #region Buttons
    const filterButtons = [
        {
            label: "Rating",
            onClick: () => restaurants?.sort(restaurant => restaurant.averageRating),
        },
        {
            label: "Cost",
            onClick: () => {},
        },
        {
            label: "Cuisine",
            onClick: () => {},
        },
        {
            label: "Location",
            onClick: () => {},
        },
    ] as ButtonData[];
    // #endregion

    if (!restaurants) return <HomePageSkeleton />;

    return (
        <>
            {error ? (
                <>Something went wrong</>
            ) : restaurantsLoading ? (
                <HomePageSkeleton />
            ) : (
                <>
                    <NavBar />

                    <Container sx={{ width: { xs: "95%", md: "80%" } }}>
                        <Card
                            elevation={10}
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                                my: 5,
                                height: 350,
                                borderRadius: { xs: 4, md: 6 },
                                background:
                                    "linear-gradient(to top, #161616, transparent), url(https://picsum.photos/seed/picsum/536/354) center center no-repeat",
                                backgroundSize: "cover",
                            }}>
                            <DesktopSearchBar restaurants={restaurants} />
                        </Card>

                        <MobileSearchBar />

                        <Typography variant="h5" mb={2}>
                            Filters
                        </Typography>

                        <Stack spacing={1} direction="row" sx={{ display: { xs: "none", md: "flex" }, mb: 8 }}>
                            {filterButtons.map(button => (
                                <Button
                                    key={`${Math.random()}_${button.label}`}
                                    onClick={() => button.onClick()}
                                    endIcon={<ExpandMoreIcon />}
                                    sx={{ boxShadow: 1 }}>
                                    {button.label}
                                </Button>
                            ))}
                        </Stack>

                        <Typography variant="h5" mb={2}>
                            Featured
                        </Typography>
                        <Fade in timeout={{ enter: 1400 }}>
                            <Grid
                                sx={{ display: { xs: "none", md: "flex" } }}
                                container
                                rowSpacing={4}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                {restaurants.map(restaurant => (
                                    <Grid item xs={4} key={`grid_${restaurant.id}`}>
                                        <Card elevation={3}>
                                            <CardActionArea
                                                onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
                                                <CardMedia
                                                    component="img"
                                                    height={180}
                                                    image={restaurant.imageUrl}
                                                />
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 16 }}>
                                                        {restaurant.name}
                                                    </Typography>
                                                    <Rating
                                                        sx={{
                                                            mt: 0.3,
                                                        }}
                                                        readOnly
                                                        precision={0.5}
                                                        value={+restaurant.averageRating}
                                                        size="small"
                                                    />
                                                    <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                                                        {restaurant.cuisines.slice(0, 3).map(cuisine => (
                                                            <Chip
                                                                key={`${Math.random()}_${cuisine}`}
                                                                color="success"
                                                                label={cuisine}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        ))}
                                                    </Stack>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Fade>

                        <Stack spacing={2.5} sx={{ display: { md: "none" } }}>
                            {restaurants.map(restaurant => (
                                <Card key={`list_${restaurant.id}`} elevation={3} sx={{ height: 120 }}>
                                    <CardActionArea
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            height: "inherit",
                                        }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography>{restaurant.name}</Typography>
                                            <Rating
                                                readOnly
                                                value={+restaurant.averageRating}
                                                precision={0.5}
                                                size="small"
                                            />
                                        </CardContent>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 151, height: "inherit" }}
                                            image={restaurant.imageUrl}
                                        />
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Stack>
                    </Container>
                </>
            )}
        </>
    );
};

export default HomePage;
