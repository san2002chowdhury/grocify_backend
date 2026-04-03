import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import userSchema from "../models/user.js"

export const verifyToken = async (req, res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.secretKey, async (err, decoded) => {
            if (err) {
                if (err.message === "TokenExpiredError") {
                    return res.status(400).json({
                        success: false,
                        message: "Token expired!",
                    })
                }
                return res.status(400).json({
                    success: false,
                    message: "Token invalid!"
                })
            }
            else {
                const { id } = decoded;
                const user = await userSchema.findById(id);
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: "User not found!"
                    })
                }
                else {
                    user.token = null;
                    user.isVerified = true;
                    await user.save();
                    return res.status(200).json({
                        success: true,
                        message: "User verified successfully!"
                    })
                }
            }
        })

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}