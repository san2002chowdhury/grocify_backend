import { contactTemplate } from "../htmlTemplate/contactTemplate.js";
import contactSchema from "../models/contact.js";
import { emailQueue } from "../queue/emailQueue.js";

export const saveContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const existData = await contactSchema.findOne({ email: email })
        if (existData) {
            return res.status(200).json({
                success: true,
                message: "You already contacted us before!"
            })
        }
        const savedResponse = await contactSchema.create({
            name,
            email,
            message
        })
        await savedResponse.save()
        const html = contactTemplate(name, email, message);
        await emailQueue.add("connectionMail", {
            to: email,
            subject: `Thanks For Contacting Us!`,
            html
        })
        return res.status(201).json({
            success: true,
            message: `${savedResponse.name},thanks for reaching out us!`
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}