import { Provider } from "react-redux";
import store from "./store";
import { useRoutes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import "./client/assets/styles/App.css";
import "./client/assets/styles/detail-card.css";
import "./client/assets/styles/restaurant-page.css";
import "./client/assets/styles/navbar.css";
import { getMockDetailCard } from "./components/common/DetailCard";
import Register from "./pages/RegisterPage";
import RestaurantPage from "./pages/RestaurantPage";
import ReviewCard from "./components/ReviewCard";
import Review from "../../server/src/models/reviews/Review";
import User from "../../server/src/models/users/User";
import Restaurant from "../../server/src/models/restaurants/Restaurant";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
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
                    userId={User.getMockUser().id}
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
