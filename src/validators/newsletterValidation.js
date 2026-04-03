import yup from "yup";

export const newsletterValidationSchema = yup.object({
    email: yup
        .string()
        .trim()
        .email("This is not valid email format")
        .required()
})

export const validateNewsletter = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (e) {
        return res.status(400).json({
            error: e.errors[0]
        })
    }
}