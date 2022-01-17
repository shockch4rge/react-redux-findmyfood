import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { RestaurantData } from "../models/Restaurant";
import { allRestaurantsAdded } from "../store/slices/restaurants";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";

import api from "../api";
import { Box } from "@mui/material";

const HomePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        api.request({
            url: "/restaurant",
            method: "get",
        }).then(response => dispatch(allRestaurantsAdded(response.data as RestaurantData[])));
    }, []);

    const restaurants = useAppSelector(state => state.entities.restaurants.list);

    return (
        <>
            <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
                {restaurants.map(r => (
                    <Card key={r.id} sx={{ width: 300, height: 300 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height={200}
                                image={"https://picsum.photos/seed/picsum/536/354"}
                            />
                            <CardContent>
                                <Typography variant="h6">{r.name}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </>
    );
};

export default HomePage;
