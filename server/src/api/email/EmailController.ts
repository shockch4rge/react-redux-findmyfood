import { Request, Response } from "express";
import emailer from "../../classes/Emailer";

export default class EmailController {
    public static async sendEmail(request: Request, response: Response) {
        // await emailer.send({
        //     from: "FindMyFood! <findmyfood@gmail.com>",
        //     to: request.params.email,
        //     subject: "Hello",
        //     text: "Hello World",
        //     html: "<b>HIIIIIIIIIII</b>",
        // });

        response.json({ msg: "Email sent!" });
    }
}
