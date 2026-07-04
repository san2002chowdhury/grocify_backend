import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.mailUser,
        pass: process.env.mailPass
    },
    tls: {
        rejectUnauthorized: false
    }
});

export function mailConfiguratin({ to, subject, html }) {
    return {
        from: process.env.mailUser,
        to,
        subject,
        html
    }
}

