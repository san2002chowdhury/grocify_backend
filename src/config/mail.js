import dotenv from "dotenv/config";
import nodemailer from "nodemailer";


export const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: process.env.mailUser,
        pass: process.env.mailPass
    },
    logger: true,
    debug: true
});

transport.verify((err, success) => {
    if (err) {
        console.log("VERIFY ERROR:", err);
    } else {
        console.log("SMTP READY");
    }
});
export function mailConfiguratin({ to, subject, html }) {
    console.log(to, subject);
    return {
        from: process.env.mailUser,
        to,
        subject,
        html
    }
}

