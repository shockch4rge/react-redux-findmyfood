import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import config from "../../config.json";

class Emailer {
    public constructor() {
        sendgrid.setApiKey(config.sendgrid.apiKey);
    }

    public async send(mail: MailDataRequired) {
        try {
            await sendgrid.send(mail);
        } catch (err) {
            console.log((err as any).response.body.errors);
            throw new Error("Failed to send email.")
        }
    }
}

export default new Emailer();
