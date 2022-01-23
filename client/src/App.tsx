import store from "./app/store";
import { Provider } from "react-redux";
import { useRoutes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import "./assets/styles/App.css";
import "./assets/styles/detail-card.css";
import "./assets/styles/restaurant-page.css";
import RegistrationPage from "./pages/RegistrationPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import LoginPage from "./pages/LoginPage";
import RestaurantPage from "./pages/RestaurantPage";

function App() {
    const routes = useRoutes([
        {
            path: "login",
            caseSensitive: true,
            element: <LoginPage />,
        },
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
            path: "*",
            caseSensitive: true,
            element: <PageNotFound />,
        },
    ]);

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>{routes}</Provider>
        </ThemeProvider>
    );
}

export default App;
