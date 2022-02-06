import "./assets/styles/App.css";
import { Provider } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import store from "./app/store";
import Snack from "./components/common/Snack";
import ScrollToTop from "./components/ScrollToTop";
import RestaurantPage from "./pages/RestaurantPage";
import ForgotPasswordPage from "./pages/password/ForgotPasswordPage";
import ManageProfilePage from "./pages/ManageProfilePage";
import PageNotFound from "./pages/PageNotFound";
import RegistrationPage from "./pages/RegistrationPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";

function App() {
    const routes = useRoutes([
        {
            path: "register",
            caseSensitive: true,
            element: <RegistrationPage />,
        },
        {
            path: "manage-profile/:userId",
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
            path: "contact",
            caseSensitive: true,
            element: <ContactPage />,
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
