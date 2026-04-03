import productSchema from "../models/product.js";
import categorySchema from "../models/category.js";

export const addProduct = async (req, res) => {
    try {
        const { name, description, category, price, offerPrice, rating } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required!"
            })
        }

        if (!description || description.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Description is required!"
            });
        }

        const categoryExists = await categorySchema.findOne({ name: category }).select("_id name");
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: "Invalid category!"
            })
        }
        const imagePaths = req.files.map((file) => file.path);
        const descriptionArray = description
            .split(".")
            .map(item => item.trim())
            .filter(item => item.length > 0);

        if (descriptionArray.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Description must contain at least one point!"
            });
        }
        const product = await productSchema.create({
            name,
            description: descriptionArray,
            category: categoryExists._id,
            price,
            offerPrice,
            images: imagePaths,
            rating
        })
        const populatedProduct = await productSchema
            .findById(product._id)
            .populate("category");

        return res.status(201).json({
            success: true,
            message: "Product added successfully!",
            populatedProduct
        })

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const products = await productSchema.find({}).populate("category").skip(skip).limit(limit);
        const totalProducts = await productSchema.countDocuments({});
        return res.status(200).json({
            success: true,
            message: "All product fetched!",
            products,
            currentPage: page,
            totalPage: Math.ceil(totalProducts / limit),
            hasMore: page * limit < totalProducts
        })

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product can't find!"
            })
        }
        const product = await productSchema.findById(id).populate("category");
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found!"
            })
        }
        const relatedProducts = await productSchema.find({
            category: product.category._id,
            _id: { $ne: product._id },
        }).populate("category").limit(5);
        return res.status(200).json({
            success: true,
            product,
            relatedProducts
        })

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}


export const getAllProductsAdvance = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            search = "",
            sort
        } = req.query;
        const query = {};

        if (search) {
            query.name = { $regex: search, $options: "im" };
        }

        let sortOption = { createdAt: -1 };

        if (sort === "price_low") {
            sortOption = { offerPrice: 1 }
        }
        else if (sort === "price_high") {
            sortOption = { offerPrice: -1 }
        }
        else {
            sortOption = { createdAt: 1 }
        }

        const skip = (page - 1) * limit;

        console.log(query);

        const products = await productSchema.find(query)
            .select("-createdAt -updatedAt -__v ")
            .populate("category", "-image -__v")
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        console.log(products);


        const total = await productSchema.countDocuments(query);
        return res.status(200).json({
            success: true,
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}

export const getTopRatedProducts = async (req, res) => {
    try {
        const products = await productSchema.find({}).populate("category").sort({ rating: -1 }).limit(10)
        return res.status(200).json({
            success: false,
            products
        });
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}

export const getCategoryWiseProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 20, sort } = req.query;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Category not found!"
            })
        }

        let sortOption = { createdAt: -1 };

        if (sort === "price_low") {
            sortOption = { offerPrice: 1 }
        }
        else {
            sortOption = { offerPrice: -1 }
        }

        const skip = (page - 1) * limit;

        const products = await productSchema.
            find({ category: id })
            .populate("category")
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))
        const total = await productSchema.countDocuments({ category: id });

        return res.status(200).json({
            success: true,
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}

export const updateStock = async (req, res) => {
    try {
        const { productId } = req.params;
        const { inStock } = req.body;
        console.log(productId, inStock);

        const product = await productSchema
            .findByIdAndUpdate(
                productId,
                { inStock },
                { returnDocument: "after" }
            )
            .populate("category");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stock updated!",
            product,
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};