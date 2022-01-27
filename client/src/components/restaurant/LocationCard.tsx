import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import config from "../../config.json";
import { RestaurantData } from "../../models/Restaurant";

interface Props {
    restaurant: RestaurantData;
}

const LocationCard = ({ restaurant }: Props) => {
    return (
        <Box>
            <Typography mb={1} variant="h5">
                LOCATION AND CONTACT
            </Typography>
            <Card
                sx={{
                    minWidth: 300,
                    width: "fit-content",
                    height: 300,
                    borderRadius: 5,
                    boxShadow: 3,
                    p: 1,
                }}
            >
                <CardContent>
                    <iframe
                        height={120}
                        frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/place?key=${config.google.apis.maps}&q=${restaurant.address.replace(" ", "+")}`}
                        allowFullScreen
                        style={{ borderRadius: 8 }}
                    />
                    <Stack spacing={1} mt={1}>
                        <Box>
                            <Typography>Location:</Typography>
                            <Typography variant="body2">{restaurant.address}</Typography>
                        </Box>
                        <Box>
                            <Typography>Opening Hours:</Typography>
                            <Typography variant="body2">
                                {restaurant.availableTimes.openingHours} -{" "}
                                {restaurant.availableTimes.closingHours}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>Telephone:</Typography>
                            <Typography variant="body2">{restaurant.telephone}</Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LocationCard;
