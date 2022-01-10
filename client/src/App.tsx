import store from "./store"
import { Provider } from "react-redux";
import { useRoutes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import "./assets/styles/App.css";
import "./assets/styles/detail-card.css";
import "./assets/styles/restaurant-page.css";
import { getMockDetailCard } from "./components/common/DetailCard";
import Register from "./pages/RegisterPage";
import RestaurantPage from "./pages/RestaurantPage";
import ReviewCard from "./components/ReviewCard";
import Review from "./models/Review";
import Restaurant from "./models/Restaurant";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
    const routes = useRoutes([
        {
            path: "register",
            caseSensitive: true,
            element: <Register onSubmit={(email, password) => {}} />,
        },
        {
            path: "restaurant",
            caseSensitive: true,
            element: (
                <RestaurantPage
                    userId={"userId"}
                    restaurant={Restaurant.getMockRestaurant()}
                />
            ),
        },
        {
            caseSensitive: true,
            path: "/mockReview",
            element: <ReviewCard review={Review.getMockReview()} />,
        },
        {
            caseSensitive: true,
            path: "/mockDetail",
            element: getMockDetailCard(),
        },
        {
            caseSensitive: true,
            path: "*",
            element: <PageNotFound />,
        },
    ]);

    return (
        <ChakraProvider>
            <Provider store={store}>{routes}</Provider>
        </ChakraProvider>
    );
};

export default App;
