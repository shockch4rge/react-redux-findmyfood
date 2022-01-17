import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { uuid } from "../../utilities/uuid";

interface Props {
    header?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    fields?: { title: string; value: string }[];
    others?: any[];
}

const DetailCard = (props: Props) => {
    const {
        header = "",
        title = "",
        description = "",
        imageUrl = "https://picsum.photos/seed/picsum/536/354",
        fields = [],
        others = [],
    } = props;

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" height={140} image={imageUrl} />
                <CardContent>
                    <Typography variant="h5">Restaurant Name</Typography>
                    <Typography variant="body2">
                        This is some boilerplate text to fill up some space in a card.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">See More</Button>
                </CardActions>
            </Card>
        </>
    );
};

export const getMockDetailCard = () => {
    return (
        <>
            <DetailCard
                title="This is a detail card title"
                description="This is the description for the detail card, and pertains a high amount of boilerplate to illustrate it."
                fields={[
                    { title: "Field 1", value: "Lorem Ipsum" },
                    { title: "Field 2", value: "Lorem Ipsum" },
                    { title: "Field 3", value: "Lorem Ipsum" },
                ]}
            />
        </>
    );
};

export default DetailCard;
