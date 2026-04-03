import express from "express";
import { saveContactMessage } from "../controllers/contactController.js";
import { contactMessageSchema, validateMessage } from "../validators/contactValidation.js";

const contactRoute = express.Router()

contactRoute.post("/send/message", validateMessage(contactMessageSchema), saveContactMessage)

export default contactRoute;