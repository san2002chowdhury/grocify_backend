import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
}, { _id: false });

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [orderItemSchema],
    shippingAddress: {
        houseNo: String,
        street: String,
        landmark: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
        phone: String,
    },
    totalItems: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ["COD", "OP"],
        default: "COD",
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "cancelled"],
        default: "pending"
    },
    paidAt: Date,

    razorpayOrderId: String,
    razorpayPaymentId: String,

    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing",
    }
}, { timestamps: true })

export default mongoose.model("order", orderSchema);