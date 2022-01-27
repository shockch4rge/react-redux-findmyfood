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
    IconButton,
    Button,
} from "@mui/material";
import Restaurant, { RestaurantData } from "../models/Restaurant";
import Review, { ReviewData } from "../models/Review";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useParams, useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import NavBar from "../components/NavBar";
import { useAppSelector } from "../hooks/useAppSelector";
import React, { useEffect, useState } from "react";
import User from "../models/User";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
    setEditReviewDialogPayload,
    setShowEditReviewDialog,
    setShowWriteReviewDialog,
    setWriteReviewDialogPayload,
} from "../app/slices/ui/dialogs";
import EditReviewDialog from "../components/dialogs/EditReviewDialog";
import WriteReviewDialog from "../components/dialogs/WriteReviewDialog";
import DetailsCard from "../components/restaurant/DetailsCard";
import LocationCard from "../components/restaurant/LocationCard";
import RatingsCard from "../components/restaurant/RatingsCard";
import { useLazyGetReviewRepliesQuery } from "../app/services/replies";
import ReviewCard from "../components/restaurant/ReviewCard";

const RestaurantPage = () => {
    const navigate = useNavigate();
    const { restaurantId } = useParams();
    // const { isLoading: restaurantLoading, data: restaurant } = useGetRestaurantQuery(restaurantId!);

    useEffect(() => {
        if (!restaurant) navigate("/home");
    }, []);

    const dispatch = useAppDispatch();

    // const { isLoading: reviewsLoading, data: reviews } = useGetRestaurantReviewsQuery(restaurantId!);
    // const user = useAppSelector(state => state.auth);

    const mockUser = User.getMockUser();
    const mockRestaurant = Restaurant.getMockRestaurant();
    const restaurant = restaurantId === mockRestaurant.id ? mockRestaurant : null;
    const reviews = new Array(10).fill(Review.getMockReview()) as ReviewData[];
    const userReview = reviews.find(review => review.userId === mockUser?.id);

    const [writableReview, setWritableReview] = useState(
        Review.getEmpty(restaurantId!, mockUser.id)
    );
    const draftReview = useAppSelector(state => state.ui.dialogs.editReview.payload);

    useEffect(() => {
        setWritableReview(prev => ({ ...prev, ...draftReview }));
    }, [draftReview]);

    if (!restaurant) {
        return <Typography>Oops! That restaurant can't be found.</Typography>;
    }

    return (
        <>
            <NavBar />

            <Container>
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
                        height: 400,
                        borderRadius: { xs: 4, md: 6 },
                        background:
                            "linear-gradient(to top, #161616, transparent), url(https://picsum.photos/seed/picsum/536/354) center center no-repeat",
                        backgroundSize: "cover",
                        overflow: "hidden",
                    }}
                >
                    <Typography variant="h4" sx={{ color: theme => theme.palette.common.white }}>
                        {restaurant.name}
                    </Typography>
                </Card>
                <Divider sx={{ my: 5 }}>DETAILS</Divider>

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 1 }}
                    justifyContent="space-between"
                    mb={7}
                >
                    <RatingsCard
                        restaurant={restaurant}
                        reviews={reviews}
                        hasUserReviewed={!!userReview}
                    />
                    <DetailsCard restaurant={restaurant} />
                    <LocationCard restaurant={restaurant} />
                </Stack>

                <Typography mb={2} variant="h5">
                    About the restaurant:
                </Typography>
                <Typography mb={2} fontSize={18} fontFamily="GalyonBook">
                    {restaurant.description}
                </Typography>

                <Divider sx={{ my: 10 }}>REVIEWS</Divider>

                <Typography mb={2} variant="h4">
                    Your Review
                </Typography>
                <Box mb={10} display="flex" justifyContent="center" alignItems="center">
                    {/* if the user isn't logged in, prompt them to sign up */}
                    {!mockUser && (
                        <Stack>
                            <Typography textAlign="center" fontSize={18} variant="body2">
                                Login or sign up to write a review!
                            </Typography>
                            <Stack
                                mt={2}
                                spacing={2}
                                direction="row"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Button variant="outlined" onClick={() => navigate("/login")}>
                                    Login
                                </Button>
                                <Button variant="outlined" onClick={() => navigate("/register")}>
                                    Sign Up
                                </Button>
                            </Stack>
                        </Stack>
                    )}

                    {/* if the user is logged in but hasn't written a review for the restaurant, prompt them to write one. */}
                    {mockUser && !userReview && (
                        <Stack>
                            <Typography textAlign="center" fontSize={18} variant="body2">
                                You haven't written a review for this restaurant yet!
                            </Typography>
                            <Typography textAlign="center" fontSize={18} variant="body2">
                                Why not write one now?
                            </Typography>
                            <Button variant="outlined" sx={{ m: 3 }}>
                                Write a review
                            </Button>

                            <WriteReviewDialog />
                        </Stack>
                    )}

                    {/* user is both logged in and has written a review - display it. */}
                    {mockUser && userReview && (
                        <Card
                            sx={{
                                width: "100%",
                                display: "flex",
                                height: "fit-content",
                                borderRadius: 3,
                                p: 2,
                            }}
                        >
                            <Container sx={{ width: "fit-content" }}>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Avatar sx={{ width: 80, height: 80, mb: 1 }} />
                                </Box>
                                <Typography textAlign="center">{mockUser.username}</Typography>
                            </Container>
                            <Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 4 }} />
                            <Box width="100%">
                                <Typography variant="h5">{userReview.title}</Typography>
                                <Rating
                                    readOnly
                                    value={userReview.rating}
                                    precision={0.5}
                                    sx={{ my: 1 }}
                                />
                                <Typography variant="body2" fontSize={16}>
                                    {userReview.content}
                                </Typography>
                                <Typography
                                    m={1}
                                    textAlign="end"
                                    sx={{ fontFamily: "GalyonBook", fontStyle: "italic" }}
                                >
                                    {userReview.timestamp.toDateString()}
                                </Typography>
                                <Button
                                    onClick={() => dispatch(setShowEditReviewDialog(true))}
                                    startIcon={<EditIcon />}
                                >
                                    Edit Review
                                </Button>
                            </Box>

                            <EditReviewDialog review={userReview} />
                        </Card>
                    )}
                </Box>

                <Box>
                    <Typography mb={5} variant="h4">
                        User Reviews
                    </Typography>

                    <Stack spacing={3}>
                        {reviews.map(review => (
                            <ReviewCard review={review} />
                        ))}
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default RestaurantPage;
