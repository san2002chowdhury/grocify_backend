import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    description: [{
        type: String,
        required: true
    }],
    images: {
        type: [String],   
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    offerPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 4
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export default mongoose.model("product", productSchema);