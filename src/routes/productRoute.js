import express from "express";
import { hasToken } from "../middlewares/hasToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { upload } from "../middlewares/upload.js";
import { addProduct, getAllProducts, getAllProductsAdvance, getCategoryWiseProduct, getOneProduct, getTopRatedProducts, updateStock } from "../controllers/productController.js";

const productRoute = express.Router();

productRoute.post("/add", hasToken, isAdmin, upload.array("images", 4), addProduct);
productRoute.get("/get", hasToken, isAdmin, getAllProducts);
productRoute.get("/get/allProducts", getAllProductsAdvance)
productRoute.get("/get/single_product/:id", getOneProduct);
productRoute.get("/get/best_selling_products", getTopRatedProducts);
productRoute.get("/get/category_wise_product/:id", getCategoryWiseProduct);
productRoute.patch("/update/stock/:productId", hasToken, isAdmin, updateStock)

export default productRoute;