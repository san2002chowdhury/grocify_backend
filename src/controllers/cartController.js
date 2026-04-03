import productSchema from "../models/product.js";
import cartSchema from "../models/cart.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity = 1 } = req.body;
        const product = await productSchema.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            })
        }

        let cart = await cartSchema.findOne({ user: userId });

        if (!cart) {
            cart = new cartSchema({
                user: userId,
                items: [],
            })
        }

        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (existingItem) {
            if (existingItem.quantity >= 5) {
                return res.status(400).json({
                    success: false,
                    message: "Maximum 5 quantity allowed for this product"
                })
            }
            existingItem.quantity += 1;
        }
        else {
            cart.items.push({
                product: product._id,
                quantity: quantity,
                price: product.offerPrice
            })
        }

        cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0)
        cart.totalAmount = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();

        const cartData = await cartSchema.findById(cart._id).populate({
            path: "items.product",
            select: "name images"
        });

        return res.status(200).json({
            success: true,
            message: "Added successfully!",
            cart: cartData,
        })

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const getCartData = async (req, res) => {
    try {
        const id = req.userId;
        let cart = await cartSchema.findOne({ user: id }).populate({
            path: "items.product",
            select: "name images"
        })
        if (!cart) {
            cart = await cartSchema.create({
                user: id,
                items: []
            });
        }
        return res.status(200).json({
            success: true,
            cart
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const id = req.userId;
        const { productId } = req.params;
        const cart = await cartSchema.findOne({ user: id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!"
            })
        }
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
        cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        await cart.save();

        const newCart = await cartSchema.findOne({ user: id })
            .populate({
                path: "items.product",
                select: "name images"
            });

        return res.status(200).json({
            success: true,
            message: "Item removed from cart!",
            cart: newCart
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const removeAllItemFromCart = async (req, res) => {
    try {
        const id = req.userId;

        const cart = await cartSchema.findOneAndUpdate(
            { user: id },
            {
                $set: {
                    items: [],
                    totalItems: 0,
                    totalAmount: 0
                }
            },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
                cart
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

export const updatProductQuantity = async (req, res) => {
    try {
        const id = req.userId;
        const { productId } = req.params;
        const { quantity } = req.body;
        const cart = await cartSchema.findOne({ user: id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!"
            })
        }

        const item = cart.items.find((item) => item.product.toString() === productId)
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart!"
            })
        }

        item.quantity = quantity;
        cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        cart.totalAmount = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        await cart.save();

        const updatedCart = await cartSchema
            .findOne({ user: id })
            .populate({
                path: "items.product",
                select: "name images"
            });
        return res.status(200).json({
            success: true,
            message: "Cart updated successfully!",
            cart: updatedCart
        })

    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
}