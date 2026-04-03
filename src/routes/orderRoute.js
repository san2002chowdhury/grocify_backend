import express from "express";
import { hasToken } from "../middlewares/hasToken.js";
import { allOrders, cancelOpOrder, cashOnDeliveryOrder, createOrder, manageOrders, userAllOrders, verifyPayment } from "../controllers/orderController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const orderRoute = express.Router();

orderRoute.post("/place_order", hasToken, cashOnDeliveryOrder);
orderRoute.post("/create_order", hasToken, createOrder);
orderRoute.post("/verify_payment", verifyPayment);
orderRoute.post("/manage", hasToken, isAdmin, manageOrders)
orderRoute.delete("/delete_order/:orderId", hasToken, cancelOpOrder);
orderRoute.get("/get/orders", hasToken, userAllOrders);
orderRoute.get("/get/allOrders", hasToken, isAdmin, allOrders)
export default orderRoute;