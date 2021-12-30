import { useState } from "react";
import { useSelector } from "react-redux";
import DetailCard from "../components/common/DetailCard";
import ReviewCard from "../components/ReviewCard";
import Restaurant from "../models/Restaurant";
import Review, { ReviewData } from "../models/Review";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { reviewsRequestedFromRestaurant } from "../store/slices/reviews";
import "../assets/styles/restaurant-page.css";
import { useNavigate } from "react-router-dom";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

interface Props {
    restaurant: Restaurant;
    userId: string;
}

const RestaurantPage = (props: Props) => {
    const {
        id,
        name,
        description,
        cuisine,
        location,
        telephone,
        availableTimes,
        averageRating,
        imageUrls,
    } = props.restaurant;

    const userId = props.userId;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    dispatch(reviewsRequestedFromRestaurant({ restaurantId: id }));

    const userReview = useAppSelector(state =>
        state.reviews.list.find(review => review.id === userId)
    );

    return (
        <>
            <NavBar />
            <Container maxW="fit-content">
                <Flex className="" justify="space-evenly">
                    <DetailCard
                        header="Ratings"
                        fields={[
                            {
                                title: "Food",
                                value: "4",
                            },
                            {
                                title: "Service",
                                value: "4",
                            },
                            {
                                title: "Ambience",
                                value: "3",
                            },
                        ]}
                    />
                    <DetailCard
                        header="Details"
                        description={description}
                        fields={[
                            {
                                title: "Cost",
                                value: "Expensive",
                            },
                            {
                                title: "Cuisine",
                                value: cuisine,
                            },
                        ]}
                    />
                    <DetailCard
                        header="Location / Contact"
                        fields={[
                            {
                                title: "Location",
                                value: "Test Street 10 #12-34",
                            },
                            {
                                title: "Opening Hours",
                                value: "00:00 - 23:59",
                            },
                            {
                                title: "Telephone",
                                value: "+65 91234567",
                            },
                        ]}
                    />
                </Flex>
            </Container>
        </>
    );
};

const renderWriteReviewSection = () => {
    return (
        <>
            <p className="centered">
                You haven't written a review for this restaurant yet. Why not do
                it?
            </p>
            <button className="centered">Write a Review</button>
        </>
    );
};

export default RestaurantPage;
