import { mailConfiguratin, transport } from "./mail.js";

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const mailOptions = mailConfiguratin({ to, subject, html });
        const info = await transport.sendMail(mailOptions);
        console.log("Email sent successfully!", info);
        return info;
    } catch (e) {
        console.log("Email error: ", e);
        throw e;
    }
}