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
    Skeleton,
} from "@mui/material";
import {
    setShowDeleteReviewDialog,
    setShowEditReviewDialog,
    setShowWriteReviewDialog,
} from "../app/slices/ui/dialogs/reviewDialog";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useParams, useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import NavBar from "../components/NavBar";
import { useAppSelector } from "../hooks/useAppSelector";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditReviewDialog from "../components/dialogs/review/EditReviewDialog";
import WriteReviewDialog from "../components/dialogs/review/WriteReviewDialog";
import DetailsCard from "../components/restaurant/DetailsCard";
import LocationCard from "../components/restaurant/LocationCard";
import RatingsCard from "../components/restaurant/RatingsCard";
import ReviewCard from "../components/restaurant/ReviewCard";
import { useGetRestaurantQuery, useUpdateRestaurantRatingMutation } from "../app/services/restaurants";
import {
    useGetRestaurantReviewsQuery,
    useLazyGetReviewByUserAndRestaurantIdQuery,
} from "../app/services/reviews";
import DeleteReviewDialog from "../components/dialogs/review/DeleteReviewDialog";
import Footer from "../components/Footer";
import RestaurantPageSkeleton from "../components/skeletons/RestaurantPageSkeleton";
import { setShowLoginDialog } from "../app/slices/ui/dialogs/userDialog";

const RestaurantPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const restaurantId = useParams().restaurantId!;
    const user = useAppSelector(state => state.auth);

    const { isLoading: restaurantLoading, data: restaurant } = useGetRestaurantQuery(restaurantId);
    const { isLoading: reviewsLoading, data: reviews } = useGetRestaurantReviewsQuery(restaurantId);

    const [updateRestaurantRating] = useUpdateRestaurantRatingMutation();
    const [fetchUserReview, { data: userReview }] = useLazyGetReviewByUserAndRestaurantIdQuery();

    // user logged in
    useEffect(() => {
        if (user) {
            fetchUserReview({ userId: user.id, restaurantId });
        }
    }, [user]);

    // number of reviews changed
    useEffect(() => {
        if (reviews) {
            fetchUserReview({ userId: user?.id, restaurantId });
            updateRestaurantRating({
                id: restaurantId,
                rating: reviews.reduce((acc, review) => +acc + +review.rating, 0) / reviews.length,
            });
        }
    }, [reviews]);

    const isLoading = restaurantLoading || reviewsLoading || !restaurant || !reviews;

    return (
        <>
            {isLoading ? (
                <RestaurantPageSkeleton />
            ) : (
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
                                background: `linear-gradient(to top, #161616, transparent), url(${restaurant.imageUrl}) center center no-repeat`,
                                backgroundSize: "cover",
                                overflow: "hidden",
                            }}>
                            <Typography variant="h3" sx={{ color: theme => theme.palette.common.white }}>
                                {restaurant.name}
                            </Typography>
                        </Card>

                        <Typography
                            mt={4}
                            variant="h3"
                            textAlign="center"
                            sx={{ display: { xs: "block", md: "none" } }}>
                            {restaurant.name}
                        </Typography>

                        <Divider sx={{ my: 5 }}>DETAILS</Divider>

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={{ xs: 4 }}
                            mb={7}>
                            <RatingsCard restaurant={restaurant} reviews={reviews} userReview={userReview} />
                            <WriteReviewDialog restaurantId={restaurant.id} />
                            <DetailsCard restaurant={restaurant} />
                            <LocationCard restaurant={restaurant} />
                        </Stack>

                        <Typography mb={2} variant="h5" sx={{ textAlign: { xs: "center", md: "left" } }}>
                            About the restaurant:
                        </Typography>
                        <Typography
                            mb={2}
                            fontSize={{ xs: 14, md: 18 }}
                            variant="body2"
                            textAlign={{ xs: "center", md: "left" }}>
                            {restaurant.description}
                        </Typography>

                        <Divider sx={{ my: 10 }}>REVIEWS</Divider>

                        <Typography mb={2} variant="h4" textAlign={{ xs: "center", md: "left" }}>
                            Your Review
                        </Typography>
                        <Box mb={10} display="flex" justifyContent="center" alignItems="center">
                            {/* if the user isn't logged in, prompt them to sign up */}
                            {!user && (
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
                                        alignItems="center">
                                        <Button
                                            variant="outlined"
                                            onClick={() => dispatch(setShowLoginDialog(true))}>
                                            Login
                                        </Button>
                                        <Button variant="outlined" onClick={() => navigate("/register")}>
                                            Sign Up
                                        </Button>
                                    </Stack>
                                </Stack>
                            )}

                            {/* if the user is logged in but hasn't written a review for the restaurant, prompt them to write one. */}
                            {user && !userReview && (
                                <Stack>
                                    <Typography textAlign="center" fontSize={18} variant="body2">
                                        You haven't written a review for this restaurant yet!
                                    </Typography>
                                    <Typography textAlign="center" fontSize={18} variant="body2">
                                        Why not write one now?
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={() => dispatch(setShowWriteReviewDialog(true))}
                                        sx={{ m: 3 }}>
                                        Write a review
                                    </Button>

                                    <WriteReviewDialog restaurantId={restaurant.id} />
                                </Stack>
                            )}

                            {/* user is both logged in and has written a review - display it. */}
                            {user && userReview && (
                                <Card
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        height: "fit-content",
                                        borderRadius: 3,
                                        p: 2,
                                    }}>
                                    <Container sx={{ width: "fit-content" }}>
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <Avatar
                                                sx={{ width: 80, height: 80, mb: 1 }}
                                                src={user.avatarPath}
                                            />
                                        </Box>
                                        <Typography textAlign="center">{user.username}</Typography>
                                    </Container>
                                    <Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 4 }} />
                                    <Box width="100%">
                                        <Typography variant="h5">{userReview.title}</Typography>
                                        <Rating
                                            readOnly
                                            value={+userReview.rating}
                                            precision={0.5}
                                            sx={{ my: 1 }}
                                        />
                                        <Typography mb={2} variant="body2" fontSize={16}>
                                            {userReview.content}
                                        </Typography>
                                        <Typography
                                            m={1}
                                            textAlign="end"
                                            variant="body2"
                                            display={{ xs: "none", md: "block" }}
                                            sx={{ position: "relative", top: 40, right: 10 }}>
                                            {userReview.isEdited ? "Edited" : "Posted"} on{" "}
                                            {userReview.timestamp.split("T")[0]}
                                        </Typography>

                                        <Stack direction="row" spacing={3}>
                                            <Button
                                                onClick={() => dispatch(setShowEditReviewDialog(true))}
                                                startIcon={<EditIcon />}>
                                                Edit Review
                                            </Button>

                                            <EditReviewDialog review={userReview} />

                                            <Button
                                                onClick={() => dispatch(setShowDeleteReviewDialog(true))}
                                                startIcon={<DeleteIcon />}>
                                                Delete Review
                                            </Button>

                                            <DeleteReviewDialog reviewId={userReview.id} />
                                        </Stack>
                                    </Box>
                                </Card>
                            )}
                        </Box>

                        <Box>
                            <Typography mb={5} variant="h4" textAlign={{ xs: "center", md: "left" }}>
                                User Reviews
                            </Typography>

                            <Stack spacing={3}>
                                {reviews &&
                                    reviews.map(review => <ReviewCard key={review.id} review={review} />)}

                                {reviews.length <= 0 && (
                                    <Box mb={10} display="flex" justifyContent="center" alignItems="center">
                                        <Typography fontSize={16} variant="body2" textAlign={{ xs: "center" }}>
                                            There are no reviews for this restaurant yet... you can be the
                                            first!
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>
                        </Box>
                    </Container>
                    <Footer />
                </>
            )}
        </>
    );
};

export default RestaurantPage;
