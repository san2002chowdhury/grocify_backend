import yup from "yup";

export const userRegisterSchem = yup.object({
    userName: yup
        .string()
        .trim()
        .min(3, "Username must be atleast 3 characters!")
        .max(30, "User name must be less than 30 characters!")
        .required(),
    email: yup
        .string()
        .trim()
        .email("This is not valid email!")
        .required(),
    password: yup
        .string()
        .required("Please enter your password!")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must contain 8 characters,  One Uppercase,One Lowercase.One Number and One Special Case Character")
});

export const validateUser = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (e) {
        return res.status(400).json({
            error: e.errors[0]
        })
    }
}