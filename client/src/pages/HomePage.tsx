import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import { Box } from "@mui/material";
import { useGetAllRestaurantsQuery } from "../app/services/restaurantApi";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const { isFetching, isLoading, data: restaurants } = useGetAllRestaurantsQuery()

    return (
        <>
            <NavBar />
            <Card sx={{ width: "80%", my: 5, mx: "auto", maxH: 500 }}>
                <CardMedia
                    height={400}
                    component="img"
                    image={"https://picsum.photos/seed/picsum/536/354"}
                />
            </Card>
            <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
                {restaurants && restaurants.map(r => (
                    <Card key={r.id} sx={{ width: 300, height: 300 }}>
                        <CardActionArea onClick={() => {}}>
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
