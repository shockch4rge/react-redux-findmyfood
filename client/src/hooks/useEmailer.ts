import { noTryAsync } from "no-try";
import api from "../api";

export const useEmailer = () => {
    const sendEmail = async (email: string) => {
        const response = await api.request({
            url: "/email",
            method: "post",
            data: {
                email,
            },
        });

        console.log(response.data);
        
    };

    return { sendEmail };
};
