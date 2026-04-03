import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import dbConnect from "./src/config/dbConnect.js";
import userRoute from "./src/routes/userRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import productRoute from "./src/routes/productRoute.js";
import cartRoute from "./src/routes/cartRoute.js";
import orderRoute from "./src/routes/orderRoute.js";
import contactRoute from "./src/routes/contactRoute.js";
import newsLetterRoute from "./src/routes/newsletter.js";

const app = express();
const PORT = process.env.PORT || 8000;

dbConnect();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/grocify/user", userRoute);
app.use("/grocify/category", categoryRoute);
app.use("/grocify/product", productRoute)
app.use("/grocify/cart", cartRoute);
app.use("/grocify/order", orderRoute)
app.use("/grocify/contact", contactRoute)
app.use("/grocify/newsletter", newsLetterRoute)

app.listen(PORT, () => {
    console.log(`<==============Server started at Port:${PORT}=============>`);
})
