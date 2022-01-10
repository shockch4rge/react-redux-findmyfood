import { useEffect, useState } from "react";
import DetailCard from "../components/common/DetailCard";
import ReviewCard from "../components/ReviewCard";
import Restaurant from "../models/Restaurant";
import { useAppSelector } from "../hooks/useAppSelector";
import reviews, { reviewsReceived, reviewsRequestedFromRestaurant } from "../store/slices/reviews";
import "../assets/styles/restaurant-page.css";
import "../assets/styles/navbar.css";
import {
    Box,
    Center,
    Container,
    Flex,
    Heading,
    Image,
    Text,
    useImage,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import NavigationBar from "../components/NavBar";
import { apiCallBegan, getApiReview, getRestaurantReviews } from "../store/middleware/api";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";

interface Props {
    restaurant: Restaurant;
    userId: string;
}

const RestaurantPage = (props: Props) => {
    const { restaurant } = props;

    const imageStatus = useImage({
        src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicsum.photos%2Fid%2F237%2F536%2F354&f=1&nofb=1",
    });
    const dispatch = useAppDispatch();
    const userLoggedIn = useAuth();
    const reviews = useAppSelector(state =>
        state.entities.reviews.list.filter(review => review.restaurantId === restaurant.id)
    );
    const user = useAppSelector(state => state.entities.user);

    return (
        <>
            <NavigationBar userLoggedIn={userLoggedIn} avatarPath={user && user.avatarPath} />
            {/* Buffer space for nav bar */}
            <Box height="20" />
            <Container maxW="container.xl">
                {imageStatus === "loaded" ? (
                    <Center borderRadius="3xl" overflow="hidden" height="96" m="12">
                        <Image
                            w="100%"
                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicsum.photos%2Fid%2F237%2F536%2F354&f=1&nofb=1"
                        />
                    </Center>
                ) : (
                    <Heading>Hello this image is not loaded!</Heading>
                )}

                <Wrap spacing="7" justify="center" mb="8">
                    <WrapItem>
                        <DetailCard
                            header="Ratings"
                            fields={[
                                { title: "Food", value: "4" },
                                { title: "Service", value: "4" },
                                { title: "Ambience", value: "3" },
                            ]}
                        />
                    </WrapItem>
                    <WrapItem>
                        <DetailCard
                            header="Details"
                            description={restaurant.description}
                            fields={[
                                { title: "Cost", value: "Expensive" },
                                { title: "Cuisine", value: restaurant.cuisine },
                            ]}
                        />
                    </WrapItem>
                    <WrapItem>
                        <DetailCard
                            header="Location / Contact"
                            fields={[
                                { title: "Location", value: "Test Street 10 #12-34" },
                                { title: "Opening Hours", value: "00:00 - 23:59" },
                                { title: "Telephone", value: "+65 91234567" },
                            ]}
                        />
                    </WrapItem>
                </Wrap>

                <Box p="10">
                    <Heading fontFamily="GalyonBold" mb="3">
                        About the Restaurant:
                    </Heading>
                    <Text>
                        {/* {props.restaurant.description} */}
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima expedita
                        assumenda hic laudantium praesentium provident fugit nam, repellendus
                        dolorem aut a exercitationem, voluptates, dolores maxime voluptate
                        repudiandae dicta modi accusantium? Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Asperiores, voluptas praesentium esse possimus quis minus
                        dolore, placeat nostrum magni, sint consectetur nobis? Id optio, sint hic
                        odit voluptates ipsa corrupti! Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Soluta saepe et explicabo necessitatibus dolores
                        blanditiis modi, aut at reprehenderit repudiandae asperiores veritatis id
                        doloribus sit ullam similique ipsam. Magnam, quam!
                    </Text>
                </Box>
            </Container>

            <Container maxW="74%" maxH="fit-content"></Container>

            <div>
                {reviews.map(review => (
                    <ReviewCard review={review}></ReviewCard>
                ))}
            </div>
        </>
    );
};

export default RestaurantPage;
