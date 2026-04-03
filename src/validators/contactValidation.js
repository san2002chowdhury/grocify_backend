import yup, { Schema } from "yup";

export const contactMessageSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(3, "Name must be atleast 3 characters!")
        .max(30, "Name must be less than 30 characters!")
        .required(),
    email: yup
        .string()
        .trim()
        .email("This is not valid email!")
        .required(),
    message: yup
        .string()
        .trim()
        .min(10, "Message must be atleast 10 characters!")
        .required("Please write a message!")
})

export const validateMessage = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (e) {
        return res.status(400).json({
            error: e.errors[0]
        })
    }
}