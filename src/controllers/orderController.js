import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv/config";
import orderSchema from "../models/order.js";
import userSchema from "../models/user.js";
import { sendEmail } from "../config/sendEmail.js";
import { confirmOrderTemplate } from "../htmlTemplate/confirmOrderTemplate.js";
import user from "../models/user.js";
import { orderDeliveredTemplate } from "../htmlTemplate/orderDeliverdTemplate.js";
const razorpay = new Razorpay({
    key_id: process.env.RazpayKeyId,
    key_secret: process.env.RazpayKeySecret
});

export const cashOnDeliveryOrder = async (req, res) => {
    try {
        const id = req.userId;
        const isPresent = await userSchema.findById(id);
        if (!isPresent) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        const { items, shippingAddress, totalAmount, totalItems } = req.body;
        const itemsArray = items.map((el) => ({
            product: el.product._id,
            name: el.product.name,
            image: el.product.images[0],
            price: el.price,
            quantity: el.quantity
        }))

        const order = await orderSchema.create({
            user: id,
            items: itemsArray,
            shippingAddress,
            totalItems,
            totalAmount,
            paymentType: "COD",
            isPaid: true,
            paymentStatus: "paid"
        })
        const html = confirmOrderTemplate(isPresent.userName, order)
        await sendEmail({
            to: isPresent.email,
            subject: `Order Confirmed-${order.paymentType}`,
            html
        })

        return res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order,
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const createOrder = async (req, res) => {
    try {
        const id = req.userId;
        console.log(id);

        const isPresent = await userSchema.findById(id);
        if (!isPresent) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        const { items, shippingAddress, totalAmount, totalItems } = req.body;
        console.log(items, shippingAddress, totalAmount, totalItems);

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `order_${Date.now()}`
        }

        const razorpayOrder = await razorpay.orders.create(options);
        const itemsArray = items.map((el) => ({
            product: el.product._id,
            name: el.product.name,
            image: el.product.images[0],
            price: el.price,
            quantity: el.quantity
        }))

        const order = await orderSchema.create({
            user: id,
            items: itemsArray,
            shippingAddress,
            totalItems,
            totalAmount,
            paymentType: "OP",
            razorpayOrderId: razorpayOrder.id,
        })
        console.log(order);


        return res.status(201).json({
            success: true,
            key: process.env.RazpayKeyId,
            order,
            razorpayOrder
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
        const body = razorpayOrderId + "|" + razorpayPaymentId;
        const expectedSignature = crypto.createHmac("sha256", process.env.RazpayKeySecret)
            .update(body)
            .digest("hex");
        if (expectedSignature === razorpaySignature) {

            const order = await orderSchema.findOneAndUpdate(
                { razorpayOrderId: razorpayOrderId },
                {
                    razorpayPaymentId: razorpayPaymentId,
                    isPaid: true,
                    paymentStatus: "paid"
                }
            )
            const user = await userSchema.findById(order.user).select("userName email");
            const html = confirmOrderTemplate(user.userName, order)
            await sendEmail({
                to: user.email,
                subject: `Order Confirmed-${order.paymentType}`,
                html
            })
        }
        return res.status(200).json({
            success: true,
            message: "Payment successful!"
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const cancelOpOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await orderSchema.findOneAndDelete({
            razorpayOrderId: orderId
        });
        return res.status(200).json({
            success: true,
            message: "Order deleted successfully!"
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const userAllOrders = async (req, res) => {
    try {
        const id = req.userId;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const order = await orderSchema.find({ user: id }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "User has no orders!",
                orders: []
            })
        }
        const totalOrders = await orderSchema.countDocuments({ user: id });
        return res.status(200).json({
            success: true,
            orders: order,
            currentPage: page,
            totalPage: Math.ceil(totalOrders / limit),
            hasMore: page * limit < totalOrders
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const allOrders = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const order = await orderSchema.find({}).populate("user").sort({ createdAt: -1 }).skip(skip).limit(limit);
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "No orders found!",
                orders: [],
            })
        }
        const totalOrders = await orderSchema.countDocuments({});
        return res.status(200).json({
            success: true,
            orders: order,
            currentPage: page,
            totalPage: Math.ceil(totalOrders / limit),
            hasMore: page * limit < totalOrders
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const manageOrders = async (req, res) => {
    try {
        console.log();

        const { _id, status } = req.body;

        const allowedStatus = ["Processing", "Shipped", "Delivered", "Cancelled"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status!",
            });
        }

        const order = await orderSchema.findByIdAndUpdate(
            _id,
            { status },
            { returnDocument: "after" }
        );
        if (status === "Delivered") {
            const user = await userSchema.findById(order.user).select("userName email")
            const html = orderDeliveredTemplate(user.userName, order);

            await sendEmail({
                to: user.email,
                subject: "Your Order Has Been Delivered!",
                html,
            });
        }
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });
        }

        return res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            order,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};