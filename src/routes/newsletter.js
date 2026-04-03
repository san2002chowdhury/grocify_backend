import express from "express";
import { newsletterValidationSchema, validateNewsletter } from "../validators/newsletterValidation.js";
import { subscribeNewsletter } from "../controllers/newsletterController.js";

const newsLetterRoute = express.Router()

newsLetterRoute.post("/subscribe", validateNewsletter(newsletterValidationSchema), subscribeNewsletter)

export default newsLetterRoute;