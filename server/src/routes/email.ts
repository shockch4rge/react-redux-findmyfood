import emails from "../api/email/EmailController";
import { RouteSchema } from "../classes/RouteManager";

module.exports = [
    {
        uri: "/send/:email",
        method: "post",
        proc: emails.sendEmail,
    },
] as RouteSchema[];
