import express from "express";
import { hasToken } from "../middlewares/hasToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { upload } from "../middlewares/upload.js";
import { addCategory, getAllCategory } from "../controllers/categoryController.js";

const categoryRoute = express.Router();

categoryRoute.post("/add", hasToken, isAdmin, upload.single("image"), addCategory);
categoryRoute.get("/get", getAllCategory);

export default categoryRoute;