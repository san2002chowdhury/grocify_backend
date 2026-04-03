import express from "express";
import { hasToken } from "../middlewares/hasToken.js";
import { addToCart, getCartData, removeAllItemFromCart, removeFromCart, updatProductQuantity } from "../controllers/cartController.js";

const cartRoute = express.Router();

cartRoute.post("/add", hasToken, addToCart);
cartRoute.get("/get", hasToken, getCartData);
cartRoute.patch("/update/:productId", hasToken, updatProductQuantity);
cartRoute.delete("/delete/:productId", hasToken, removeFromCart);
cartRoute.delete("/clear", hasToken, removeAllItemFromCart);

export default cartRoute;