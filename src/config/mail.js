import dotenv from "dotenv/config";
import nodemailer from "nodemailer";


export const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.mailUser,
        pass: process.env.mailPass,
    },

    family: 4
});

transport.verify((err) => {
    if (err) {
        console.log("VERIFY ERROR:", err);
    } else {
        console.log("SMTP READY");
    }
});

export function mailConfiguratin({ to, subject, html }) {
    return {
        from: process.env.mailUser,
        to,
        subject,
        html
    };
}
