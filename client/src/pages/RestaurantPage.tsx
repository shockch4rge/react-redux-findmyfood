import { useCallback, useEffect, useState } from "react";
import DetailCard from "../components/common/DetailCard";
import ReviewCard from "../components/ReviewCard";
import Restaurant from "../models/Restaurant";
import { useAppSelector } from "../hooks/useAppSelector";
import reviews, {
    reviewAdded,
    reviewsReceived,
    reviewsRequestedFromRestaurant,
} from "../store/slices/reviews";
import "../assets/styles/restaurant-page.css";
import { useNavigate } from "react-router-dom";
import { Container, Flex, Image, Text } from "@chakra-ui/react";
import NavigationBar from "../components/NavBar";
import { apiCallBegan, getApiReview, getRestaurantReviews } from "../store/middleware/api";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";

interface Props {
    restaurant: Restaurant;
    userId: string;
}

const RestaurantPage = (props: Props) => {
    const { userId, restaurant } = props;

    const dispatch = useAppDispatch();
    const loggedIn = useAuth();

    useEffect(() => {
        getRestaurantReviews()
            .then(reviews => {
                dispatch(reviewsRequestedFromRestaurant());
                // dispatch(apiCallBegan());
                dispatch(reviewsReceived());
        });
    }, []);

    const reviews = useAppSelector(state =>
        state.entities.reviews.list.filter(review => review.restaurantId === restaurant.id)
    );

    if (!reviews) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }

    return (
        <>
            <NavigationBar />
            <Container maxW="fit-content">
                <Flex className="" justify="space-evenly">
                    <DetailCard
                        header="Ratings"
                        fields={[
                            { title: "Food", value: "4" },
                            { title: "Service", value: "4" },
                            { title: "Ambience", value: "3" },
                        ]}
                    />
                    <DetailCard
                        header="Details"
                        description={restaurant.description}
                        fields={[
                            { title: "Cost", value: "Expensive" },
                            { title: "Cuisine", value: restaurant.cuisine },
                        ]}
                    />
                    <DetailCard
                        header="Location / Contact"
                        fields={[
                            { title: "Location", value: "Test Street 10 #12-34" },
                            { title: "Opening Hours", value: "00:00 - 23:59" },
                            { title: "Telephone", value: "+65 91234567" },
                        ]}
                    />
                </Flex>
            </Container>
            <div>
                {reviews.map(review => (
                    <ReviewCard review={review}></ReviewCard>
                ))}
            </div>
        </>
    );
};

export default RestaurantPage;
