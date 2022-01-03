import { Provider } from "react-redux";
import store from "./client/store";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import PageNotFound from "./client/pages/PageNotFound";
import "./client/assets/styles/App.css";
import "./client/assets/styles/detail-card.css";
import "./client/assets/styles/restaurant-page.css"
import "./client/assets/styles/navbar.css"
import { getMockDetailCard } from "./client/components/common/DetailCard";
import Register from "./client/pages/RegisterPage";
import RestaurantPage from "./client/pages/RestaurantPage";
import Restaurant from "./client/models/Restaurant";
import User from "./client/models/User";
import ReviewCard from "./client/components/ReviewCard";
import Review from "./client/models/Review";
import { ChakraProvider }from "@chakra-ui/react"

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
