import { useState } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "../components/ReviewCard";
import Restaurant from "../models/Restaurant";
import Review, { ReviewData } from "../models/Review";
import { useAppSelector } from "../store/hooks/useAppSelector";

interface Props {
    restaurant: Restaurant;
}

const RestaurantPage = (props: Props) => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const restaurants = useAppSelector(state => state.restaurants.list);

    return (
        <>
            {restaurants[0]}
        </>
    );
};

export default RestaurantPage;
