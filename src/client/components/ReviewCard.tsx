import Review from "../models/Review";

import starFull from "../assets/images/star-full.svg";
import { useAppSelector } from "../hooks/useAppSelector";
import { timestamp } from "../utilities/timestamp";

interface Props {
    review: Review;
    editable?: {
        onEdit: () => void;
        onDelete: () => void;
    };
}

const ReviewCard = (props: Props) => {
    const { id, title, content, rating, timestamp } = props.review;
    const review = useAppSelector(state => state.reviews.list.find(review => review.id === id))

    return (
        <>
        </>
    );
};

const renderStarIcons = (props: Props) => {
    const { rating } = props.review;

    const emptyStars = [];
    const stars = [];

    for (let i = 0; i < rating; i++) {
        stars.push(<img src={starFull} />);
    }

    return <span>{stars}</span>;
};

const renderEditButtons = (props: Props) => {
    if (!props.editable) return;

    const { onEdit, onDelete } = props.editable;

    return (
        <>
        </>
    );
};

export default ReviewCard;
