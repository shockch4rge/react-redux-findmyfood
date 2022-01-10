import { useEffect, useState } from "react";
import store from "../store/index";

export const useAuth = () => {
    const storeLoginState = store.getState().auth.loggedIn;
    const [loggedIn, setLoggedIn] = useState(storeLoginState);

    useEffect(() => {
        setLoggedIn(storeLoginState);
    }, [storeLoginState]);

    return loggedIn;
};
