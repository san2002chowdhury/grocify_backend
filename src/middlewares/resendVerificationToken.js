import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import userSchema from "../models/user.js"
import { sendEmail } from "../config/sendEmail.js";
import { verifyEmailTemplate } from "../htmlTemplate/verifyEmailTemplate.js";

export const resendVerificationToken = async (req, res) => {
    try {
        console.log(req.body);

        const { email } = req.body;
        const user = await userSchema.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User already verified!"
            })
        }
        const newToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.secretKey,
            { expiresIn: "10m" }
        );

        const verifyLink = `${process.env.FRONTEND_URL}/verify_email/${newToken}`;
        const html = verifyEmailTemplate(verifyLink, user.userName);


        user.token = newToken;
        await user.save();
        await sendEmail({
            to: email,
            subject: "Verify Your Email",
            html
        });
        return res.status(200).json({
            success: true,
            message: "Verification email resent!",
            token: newToken
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }

}