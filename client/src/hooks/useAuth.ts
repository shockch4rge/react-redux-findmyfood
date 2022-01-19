import axios from "axios";
import { userLoggedIn, userLoggedOut } from "../app/slices/auth";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import api from "../api";
import { noTryAsync } from "no-try"
import { apiCallFailed } from "../app/middleware/endpointTester";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);

    const logIn = async (email: string, password: string) => {
        const [err, response] = await noTryAsync(async () => {
            return await api.request({
                url: "/users/email&password",
                method: "get",
                params: {
                    email,
                    password,
                },
            });
        })

        if (err) {
            dispatch(apiCallFailed("Login failed"))
            return;
        }

        dispatch(userLoggedIn(response.data));
    };

    const logOut = async () => {
        dispatch(userLoggedOut());
    };

    return { logIn, logOut, user };
};
