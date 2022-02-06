import { Request, Response } from "express";
import emailer from "../../classes/Emailer";
import config from "../../../config.json";

export default class EmailController {
    public static async sendResetPassword(request: Request, response: Response) {
        try {
            await emailer.send({
                from: config.sendgrid.senderEmail,
                to: request.params.email,
                subject: "Password Reset for FindMyFood!",
                html: `<h1>Reset your password <a href='http://localhost:3000/home'>here!</a></h1>`,
            });

            response.json({ msg: "Email sent!" });
        } catch (err) {
            console.log((err as Error).message);
            response.status(500).send("There was an error sending the email.");
        }
    }

    public static async sendFeedback(request: Request, response: Response) {
        const senderEmail = config.sendgrid.senderEmail;
        const userEmail = request.params.email
        const feedback = request.body.feedback;

        try {
            await emailer.send({
                from: senderEmail,
                to: senderEmail,
                subject: `Feedback from ${userEmail}`,
                html: `<h1>${feedback}</h1>`,
            });

            await emailer.send({
                from: senderEmail,
                to: userEmail,
                subject: `Feedback received`,
                html: `
                    <h1>Thank you for your feedback! This is what you wrote: </h1>
                    <br>
                    <p>${feedback}</p>
                `,
            })

            response.json({ msg: "Email sent!" });
        }
        catch (err) {
            response.status(500).send("There was an error executing this request.");
        }
    }
}
