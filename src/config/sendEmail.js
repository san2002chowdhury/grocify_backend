import { mailConfiguratin, transport } from "./mail.js";

export const sendEmail = async ({ to, subject, html }) => {
    try {
        console.log("Here-->");

        const mailOptions = mailConfiguratin({ to, subject, html });
        console.log("Here2-->");

        const info = await transport.sendMail(mailOptions);
        console.log("Here3-->");

        console.log("Email sent successfully!", info);
        return info;
    } catch (e) {
        console.log("Email error: ", e);
        throw e;
    }
}