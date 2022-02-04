import { Request, Response } from "express";
import emailer from "../../classes/Emailer";
import config from "../../../config.json";

export default class EmailController {
    public static async sendEmail(request: Request, response: Response) {
        try {
            await emailer.send({
                from: config.sendgrid.senderEmail,
                to: `${request.params.email}`,
                subject: "Password Reset for FindMyFood!",
                html: `<h1>Reset your password <a href='http://localhost:3000/home'>here!</a></h1>`,
            });

            response.json({ msg: "Email sent!" });
        } catch (err) {
            response.status(500).send((err as Error).message);
        }
    }
}
