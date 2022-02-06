import emails from "../api/email/EmailController";
import { RouteSchema } from "../classes/RouteManager";

module.exports = [
    {
        uri: "/reset-password/:email",
        method: "post",
        proc: emails.sendResetPassword,
    },
    {
        uri: "/send-feedback/:email",
        method: "post",
        proc: emails.sendFeedback,
    }
] as RouteSchema[];
