import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    }

}, { _id: false })


const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
        index: true
    },
    items: [cartItemSchema],

    totalItems: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model("cart", cartSchema);