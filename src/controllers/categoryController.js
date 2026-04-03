import categorySchema from "../models/category.js";

export const addCategory = async (req, res) => {
    try {
        const { name, path } = req.body;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Category image is required!"
            });
        }
        const category = await categorySchema.create({
            name,
            path,
            image: req.file.path,
        });
        return res.status(201).json({
            success: true,
            message: "Category added successfully!",
            category
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const categories = await categorySchema.find();
        return res.status(200).json({
            success: true,
            data: categories.length,
            categories
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

