import { Provider } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/store";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";
import "./assets/styles/detail-card.css";
import { getMockReviewCard } from "./components/ReviewCard";
import { getMockDetailCard } from "./components/common/DetailCard";
import Register from "./pages/RegisterPage";
import RestaurantPage from "./pages/RestaurantPage";
import Restaurant from "./models/Restaurant";

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
                <RestaurantPage restaurant={Restaurant.getMockRestaurant()} />
            ),
        },
        {
            caseSensitive: true,
            path: "/mockReview",
            element: getMockReviewCard(),
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
        <>
            <Provider store={store}>{routes}</Provider>
        </>
    );
}

export default App;
