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


app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://grocify-frontend-ttg2.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.options("/*", (req, res) => {
    res.sendStatus(200);
});
app.use(express.json());

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
