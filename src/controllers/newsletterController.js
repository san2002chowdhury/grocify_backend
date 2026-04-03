import { sendEmail } from "../config/sendEmail.js";
import { newsletterThanksTemplate } from "../htmlTemplate/newsletterThanksTemplate.js";
import newletterSchema from "../models/newsletter.js"

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        const existData = await newletterSchema.findOne({ email })
        if (existData) {
            return res.status(200).json({
                success: true,
                message: "You already subscribed us before!"
            })
        }
        const result = await newletterSchema.create({
            email
        });
        await result.save()
        const html = newsletterThanksTemplate(email);
        await sendEmail({
            to: email,
            subject: `Thanks For Your Subscription!`,
            html
        })
        return res.status(201).json({
            success: true,
            message: "Thank you! for subscribing us!"
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}