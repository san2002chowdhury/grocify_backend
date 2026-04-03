import express from "express";
import { forgotPassword, getUser, login, logout, register, resetPassword, updateUserData, verifyOtp } from "../controllers/userController.js";
import { userRegisterSchem, validateUser } from "../validators/userValidation.js";
import { resendVerificationToken } from "../middlewares/resendVerificationToken.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { hasToken } from "../middlewares/hasToken.js";
import { upload } from "../middlewares/upload.js";

const userRoute = express.Router();

userRoute.post("/register", validateUser(userRegisterSchem), register);
userRoute.post("/login", login);
userRoute.get("/verify/:token", verifyToken)
userRoute.post("/resend_token", resendVerificationToken)
userRoute.post("/forgot_password", forgotPassword);
userRoute.post("/verify_otp", verifyOtp);
userRoute.post("/reset_password", resetPassword)
userRoute.post("/logout", hasToken, logout)
userRoute.get("/get", hasToken, getUser);
userRoute.put("/update_profile", hasToken, upload.single("profilePic"), updateUserData)

export default userRoute;