import nm from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
// import oauth from "../oauth"

class Emailer {
    // public readonly transporter: nm.Transporter;

    public constructor() {
        //     this.transporter = nm.createTransport({
        //         //@ts-ignore
        //         service: "gmail",
        //         auth: {
        //             type: "OAuth2",
        //             user: "favouriteteo@gmail.com",
        //             clientId: oauth._clientId,
        //             clientSecret: oauth._clientSecret,
        //             refreshToken: oauth.credentials.refresh_token,
        //             accessToken: oauth.credentials.access_token,
        //         },
        //     } as SMTPTransport.Options);

        // }

        // public async send(mail: Mail.Options) {
        //     await this.transporter.sendMail(mail);
        // }
    }
}

export default new Emailer