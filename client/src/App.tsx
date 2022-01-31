import "./assets/styles/App.css";
import theme from "./theme";
import store from "./app/store";
import { Provider } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import RegistrationPage from "./pages/RegistrationPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@mui/material";
import RestaurantPage from "./pages/RestaurantPage";
import ScrollToTop from "./utilities/ScrollToTop";
import HomePageSkeleton from "./components/skeletons/HomePageSkeleton";
import RestaurantPageSkeleton from "./components/skeletons/RestaurantPageSkeleton";
import Snack from "./components/common/Snack";

function App() {
    const routes = useRoutes([
        {
            path: "register",
            caseSensitive: true,
            element: <RegistrationPage />,
        },
        {
            path: "home",
            caseSensitive: true,
            element: <HomePage />,
        },
        {
            path: "about",
            caseSensitive: true,
            element: <AboutPage />,
        },
        {
            path: "restaurant/:restaurantId",
            caseSensitive: true,
            element: <RestaurantPage />,
        },
        {
            path: "skeleton",
            caseSensitive: true,
            element: <RestaurantPageSkeleton />,
        },
        {
            path: "/",
            element: <Navigate replace to="/home" />,
        },
        {
            path: "*",
            caseSensitive: true,
            element: <PageNotFound />,
        },
    ]);

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <ScrollToTop>{routes}</ScrollToTop>
                <Snack />
            </Provider>
        </ThemeProvider>
    );
}

export default App;
