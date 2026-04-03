import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import userSchema from "../models/user.js";

export const hasToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Session not found or invalid session!...Please login and then try"
            });
        }
        else {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.secretKey, async (err, decoded) => {
                if (err) {
                    if (err.message === "TokenExpiredError") {
                        return res.status(400).json({
                            success: false,
                            message: "Session expired!...Please login and then try!"
                        })
                    }
                    return res.status(400).json({
                        success: false,
                        message: "Session invalid!...Please login and then try"
                    })
                }
                else {
                    const { id, role } = decoded;
                    const user = await userSchema.findById(id).select("name _id email role");
                    if (!user) {
                        return res.status(401).json({
                            success: false,
                            message: "User not found!"
                        })
                    }
                    req.userId = id;
                    req.userRole = role;
                    next();
                }
            })
        }
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}