import dotenv from "dotenv/config";
import nodemailer from "nodemailer";
import dns from "dns";

const lookup = (hostname, options, cb) => {
    return dns.lookup(hostname, { family: 4 }, cb);
};

export const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.mailUser,
        pass: process.env.mailPass,
    },
    tls: {
        rejectUnauthorized: false,
    },
    lookup,
});

export function mailConfiguratin({ to, subject, html }) {
    return {
        from: process.env.mailUser,
        to,
        subject,
        html
    };
}
