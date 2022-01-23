import { Box, Typography, Card, CardContent, Rating } from "@mui/material";
import { RestaurantData } from "../../models/Restaurant";
import { ReviewData } from "../../models/Review";

interface Props {
    restaurant: RestaurantData;
    reviews: ReviewData[];
}

const RatingCard = ({ restaurant, reviews }: Props) => {
    return (
        <Box>
            <Typography mb={1} variant="h5">
                RATING
            </Typography>
            <Card
                sx={{
                    minWidth: 300,
                    width: "fit-content",
                    height: 300,
                    borderRadius: 6,
                    boxShadow: 3,
                    p: 1,
                }}
            >
                <CardContent>
                    <Typography variant="h3">{restaurant.averageRating}</Typography>
                    <Box sx={{ display: "flex" }}>
                        <Rating readOnly value={restaurant.averageRating} precision={0.5} />
                        <Typography ml={1} fontSize={16}>
                            ({reviews.length} reviews)
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RatingCard;
