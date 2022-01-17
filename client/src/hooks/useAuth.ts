import axios from "axios";
import { userLoggedIn, userLoggedOut } from "../store/slices/auth";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import api from "../api";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);

    const logIn = async (email: string, password: string) => {
        const { data } = await api.request({
            url: "/users",
            data: {
                email,
                password,
            },
            method: "get",
        });

        dispatch(userLoggedIn(data));
    };

    const logOut = () => {
        dispatch(userLoggedOut());
    };

    return { logIn, logOut, user };
};
