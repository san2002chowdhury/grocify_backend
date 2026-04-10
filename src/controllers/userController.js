import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import userSchema from "../models/user.js";
import { verifyEmailTemplate } from "../htmlTemplate/verifyEmailTemplate.js";
import { forgotPasswordOtpTemplate } from "../htmlTemplate/forgotPasswordOtpTemplate.js";
import { emailQueue } from "../queue/emailQueue.js";
import { redisConnection } from "../config/redis.js";


export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const existing = await userSchema.findOne({ email: email });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "User is already registered!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userSchema.create({
            userName,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.secretKey, { expiresIn: "1m" })
        const verifyLink = `${process.env.FRONTEND_URL}/verify_email/${token}`;
        const html = verifyEmailTemplate(verifyLink, userName);
        user.token = token;
        await user.save();
        await emailQueue.add("sendVerifyUserMail", {
            to: email,
            subject: "Verify Your Email",
            html
        })
        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user,
            token
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthoried access!"
            })
        }
        else {
            const passwordCheck = await bcrypt.compare(password, user.password);
            if (!passwordCheck) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials!"
                })
            }
            else if (passwordCheck && user.isVerified === true) {
                const accessToken = jwt.sign(
                    { id: user._id, role: user.role },
                    process.env.secretKey,
                    { expiresIn: "10days" }
                );
                const refreshToken = jwt.sign(
                    { id: user._id, role: user.role },
                    process.env.secretKey,
                    { expiresIn: "30days" }
                );
                user.isLoggedIn = true;
                await user.save();
                return res.status(200).json({
                    success: true,
                    message: "User logged in successfully!",
                    accessToken,
                    refreshToken,
                    user
                })

            }
            else {
                return res.status(400).json({
                    success: false,
                    message: "Please verify your email then login!"
                })
            }
        }
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userSchema.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found!"
            })
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        await redisConnection.set(`otp:${email}`, otp, "EX", 300);
        const html = forgotPasswordOtpTemplate(otp, user.userName,)
        await emailQueue.add("sendOtpMail", {
            to: email,
            subject: "OTP For Forgot Password",
            html
        })

        return res.status(200).json({
            success: true,
            message: "OTP send successfully!",
            email: user.email
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const user = await userSchema.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found!"
            })
        }
        else {
            const storedOtp = await redisConnection.get(`otp:${user.email}`);
            if (!storedOtp) {
                return res.status(400).json({
                    success: false,
                    message: "OTP Expired!"
                })
            }
            else if (storedOtp !== otp) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP!"
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: "Otp verified successfully!",
                    email: user.email
                })
            }
        }

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({
            email: email
        })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password change successfully!"
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}


export const logout = async (req, res) => {
    try {
        const user = await userSchema.findById({ _id: req.userId });
        user.isLoggedIn = false;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "User logged out successfully!",
        })

    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.userId;
        const user = await userSchema.findById(id).select("userName email phone profilePic address isLoggedIn isVerified role");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        return res.status(200).json({
            success: true,
            user
        })

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const updateUserData = async (req, res) => {
    try {
        const id = req.userId;
        const { userName, phone, houseNo, street, landmark, city, state, country, pincode } = req.body;
        const user = await userSchema.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }

        if (userName) user.userName = userName;
        if (phone) user.phone = phone;

        if (req.file) {
            if (user.profilePic) {
                fs.unlink(user.profilePic, (err) => {
                    if (err) {
                        console.log("Old image delete failed!", err.message);
                    }
                })
            }
            user.profilePic = req.file.path;
        }

        const addressData = {
            houseNo,
            street,
            landmark,
            city,
            state,
            pincode
        }

        Object.keys(addressData).forEach(
            (key) => addressData[key] === undefined && delete addressData[key]
        )

        if (Object.keys(addressData).length > 0) {
            if (user.address.length === 0) {
                user.address.push(addressData);
            }
            else {
                user.address[0] = {
                    ...user.address[0]._doc,
                    ...addressData
                }
            }
        }
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            user
        })


    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}