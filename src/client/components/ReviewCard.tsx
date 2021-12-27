import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import Review from "../models/Review";

import starFull from "../assets/images/star-full.svg";
import { useAppSelector } from "../store/hooks/useAppSelector";
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
        <Card className="col-md-9 col-centered" body>
            <CardBody>
                <CardTitle tag="h5" style={{ fontFamily: "GalyonBold" }}>
                    {title}
                </CardTitle>
                <CardText>{content}</CardText>
                <CardText>{renderStarIcons(props)}</CardText>
                <CardText className=" col-centered">
                    Timestamp: {timestamp}
                </CardText>

                {renderEditButtons(props)}
            </CardBody>
        </Card>
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
            <Button onClick={() => onEdit()}>Edit Review</Button>
            <Button onClick={() => onDelete()} color="danger">
                Delete Review
            </Button>
        </>
    );
};

export const getMockReviewCard = () => {
    return (
        <ReviewCard
            review={{
                id: "1",
                title: "Food was amazing!",
                content:
                    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus enim fuga molestias officiis tempore a quasi iusto optio natus nisi deserunt facere cumque ipsum beatae quam doloremque, quae eum dolor.",
                restaurantId: "123",
                userId: "321",
                rating: 4,
                timestamp: timestamp(),
                isEdited: false,
            }}
        />
    );
};

export default ReviewCard;
