import { RestaurantData } from "../models/Restaurant";
import { useAppSelector } from "../hooks/useAppSelector";
import "../assets/styles/restaurant-page.css";
import "../assets/styles/navbar.css";
import Review from "../models/Review";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useEffect } from "react";

interface Props {
    restaurant: RestaurantData
}

const RestaurantPage = (props: Props) => {
    const { restaurant } = props;
    const { user } = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [])

    const { lastFetch, list, loading } = useAppSelector(state => state.entities.reviews);
    const reviews = list.filter(review => review.restaurantId === restaurant.id);

    return (
        <>
            
        </>
    );
};

const WriteReviewSection = (props: { review?: Review }) => {
    const { review } = props;

    return (
        <>
            
        </>
    );
};

export default RestaurantPage;
