import {
    Card,
    CardContent,
    Container,
    Rating,
    Stack,
    Typography,
    Box,
    Avatar,
    Divider,
} from "@mui/material";
import Restaurant, { RestaurantData } from "../models/Restaurant";
import Review, { ReviewData } from "../models/Review";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useGetRestaurantReviewsQuery, useGetReviewQuery } from "../app/services/reviews";
import { useGetRestaurantQuery } from "../app/services/restaurants";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import DetailCard from "../components/common/DetailCard";
import RatingCard from "../components/restaurant/RatingCard";
import DetailsCard from "../components/restaurant/DetailsCard";
import LocationCard from "../components/restaurant/LocationCard";
import NavBar from "../components/NavBar";

const RestaurantPage = () => {
    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // const { isLoading: restaurantLoading, data: restaurant } = useGetRestaurantQuery(restaurantId!);
    // const { isLoading: reviewLoading, data: reviews } = useGetRestaurantReviewsQuery(restaurantId!);
    const user = useAppSelector(state => state.auth);

    const restaurant =
        restaurantId === Restaurant.getMockRestaurant().id ? Restaurant.getMockRestaurant() : null;

    const reviews = new Array(10).fill(Review.getMockReview(), 0) as ReviewData[];

    const mockReview = Review.getMockReview();

    if (!restaurant) {
        navigate("*");
        return <Typography>Oops! That restaurant can't be found.</Typography>;
    }

    const RestaurantImage = () => {
        return (
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
                    overflow: "hidden",
                }}
            >
                <Card sx={{}}></Card>
                <Typography variant="h4" sx={{ color: theme => theme.palette.common.white }}>
                    {restaurant.name}
                </Typography>
            </Card>
        );
    };

    return (
        <>
            <NavBar />

            <Container>
                <RestaurantImage />
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 1 }}
                    justifyContent="space-between"
                >
                    <RatingCard restaurant={restaurant} reviews={reviews} />
                    <DetailsCard restaurant={restaurant} />
                    <LocationCard restaurant={restaurant} />
                </Stack>

                <Divider sx={{ my: 10 }}>REVIEWS</Divider>

                <Box mb={10}>
                    <Typography mb={2} variant="h4">
                        Your Review
                    </Typography>
                    <Card sx={{ display: "flex", height: "fit-content", borderRadius: 3, p: 2 }}>
                        <Container sx={{ width: "fit-content" }}>
                            <Avatar sx={{ width: 80, height: 80, mb: 1 }} />
                            <Typography textAlign="center">Username</Typography>
                        </Container>
                        <Divider orientation="vertical" flexItem sx={{ mx: 4 }} />
                        <Box>
                            <Typography variant="h5">Lorem Ipsum</Typography>
                            <Rating
                                readOnly
                                value={mockReview.rating}
                                precision={0.5}
                                sx={{ my: 1 }}
                            />
                            <Typography variant="body2" fontSize={16}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
                                voluptatibus similique vel ipsa beatae eum ratione aliquam atque
                                inventore in sed nulla, voluptatem illo consectetur culpa facere
                                assumenda soluta. Iure?
                            </Typography>
                            <Typography
                                m={1}
                                textAlign="end"
                                sx={{ fontFamily: "GalyonBook", fontStyle: "italic" }}
                            >
                                {mockReview.timestamp.toDateString()}
                            </Typography>
                        </Box>
                    </Card>
                </Box>

                <Box>
                    <Typography mb={2} variant="h4">
                        User Reviews
                    </Typography>
                    <Stack spacing={3}>
                        {reviews.map(review => (
                            <Card
                                sx={{
                                    display: "flex",
                                    height: "fit-content",
                                    borderRadius: 3,
                                    p: 2,
                                }}
                            >
                                <Container sx={{ width: "fit-content" }}>
                                    <Avatar sx={{ width: 80, height: 80, mb: 1 }} />
                                    <Typography textAlign="center">Username</Typography>
                                </Container>
                                <Divider orientation="vertical" flexItem sx={{ mx: 4 }} />
                                <Box>
                                    <Typography variant="h5">{review.title}</Typography>
                                    <Rating
                                        readOnly
                                        value={review.rating}
                                        precision={0.5}
                                        sx={{ my: 1 }}
                                    />
                                    <Typography variant="body2" fontSize={16}>
                                        {review.content}
                                    </Typography>
                                </Box>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default RestaurantPage;
