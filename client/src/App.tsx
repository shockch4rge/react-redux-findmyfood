import "./assets/styles/App.css";
import theme from "./theme";
import store from "./app/store";
import { Provider } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import ScrollToTop from "./components/ScrollToTop";
import Snack from "./components/common/Snack";
import RestaurantPage from "./pages/RestaurantPage";
import ForgotPasswordPage from "./pages/password/ForgotPasswordPage";
import ManageProfilePage from "./pages/ManageProfilePage";
import PageNotFound from "./pages/PageNotFound";
import RegistrationPage from "./pages/RegistrationPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

function App() {
    const routes = useRoutes([
        {
            path: "register",
            caseSensitive: true,
            element: <RegistrationPage />,
        },
        {
            path: "manage-profile",
            caseSensitive: true,
            element: <ManageProfilePage />,
        },
        {
            path: "forgot-password",
            caseSensitive: true,
            element: <ForgotPasswordPage />,
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
