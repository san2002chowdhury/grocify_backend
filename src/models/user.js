import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    phone: {
        type: String,
        default: null
    },
    profilePic: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    address: [
        {
           
            houseNo: String,
            street: String,
            landmark: String,
            city: String,
            state: String,
            country: { type: String, default: "India" },
            pincode: String,
        }
    ],
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiredAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

export default mongoose.model("user", userSchema);