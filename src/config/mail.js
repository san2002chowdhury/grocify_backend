import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.mailUser,
        pass: process.env.mailPass
    }
})

export function mailConfiguratin({ to, subject, html }) {
    return {
        from: process.env.mailUser,
        to,
        subject,
        html
    }
}

