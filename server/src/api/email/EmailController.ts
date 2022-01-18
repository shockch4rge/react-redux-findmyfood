import { Request, Response } from "express";
import emailer from "../../classes/Emailer";

export default class EmailController {
    public static async sendEmail(request: Request, response: Response) {
        await emailer.send({
            from: "FindMyFood! <findmyfood@gmail.com>",
            to: request.params.email,
            subject: "Hello fucker",
            text: "Hello World fucker",
            html: "<b>FUCK YOU</b>",
        });

        response.json({ msg: "Email sent!" });
    }
}
