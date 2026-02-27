const { Op } = require("sequelize");
const Eyewear = require('../models/eyewearDetailsModels/eyewearDetails');
const Jewellery = require('../models/jewelleryDetailsModels/jewelleryDetails');
const Clothing = require("../models/clothingDetailModels/clothingDetail");
const Footwear = require('../models/footwearDetailsModels/footwearDetails');
const Purse = require('../models/bagsDetailsModels/bagsDetails');
const Products = require('../models/eyewearModels/product');


exports.getAllSearchCategory = async (req, res) => {
    try {
        // GET http://localhost:5000/api/allproducts?page=2&limit=50
        // GET http://localhost:5000/api/allproducts?search=denim blue
        // GET http://localhost:5000/api/allproducts?search=men clothing&page=1&limit=20

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const offset = (page - 1) * limit;

        // Search Query
        const search = req.query.search || "";
        const words = search.split(" ").filter(Boolean);

        // Sequelize LIKE conditions
        const searchCondition = {
            [Op.or]: words.map((w) => ({
                [Op.or]: [
                    { product_name: { [Op.like]: `%${w}%` } },
                    { product_type: { [Op.like]: `%${w}%` } },
                    { brand_name: { [Op.like]: `%${w}%` } },
                    { color: { [Op.like]: `%${w}%` } },
                    { main_category: { [Op.like]: `%${w}%` } },
                    { sub_category: { [Op.like]: `%${w}%` } },
                ],
            })),
        };

        // Fetch from all tables
        const [eyewear, jewellery, clothing, footwear, purse] = await Promise.all([
            Eyewear.findAll({ where: search ? searchCondition : {} }),
            Jewellery.findAll({ where: search ? searchCondition : {} }),
            Clothing.findAll({ where: search ? searchCondition : {} }),
            Footwear.findAll({ where: search ? searchCondition : {} }),
            Purse.findAll({ where: search ? searchCondition : {} }),
        ]);

        // Merge all products
        const allProducts = [
            ...eyewear.map((p) => ({ ...p.toJSON(), category: "eyewear" })),
            ...jewellery.map((p) => ({ ...p.toJSON(), category: "jewellery" })),
            ...clothing.map((p) => ({ ...p.toJSON(), category: "clothing" })),
            ...footwear.map((p) => ({ ...p.toJSON(), category: "footwear" })),
            ...purse.map((p) => ({ ...p.toJSON(), category: "purse" })),
        ];

        // Pagination
        const totalProducts = allProducts.length;
        const paginatedData = allProducts.slice(offset, offset + limit);

        res.status(200).json({
            search,
            page,
            limit,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            data: paginatedData,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
};


exports.getAllCetegory = async (req, res) => {
    try {
        // Pagination Inputs
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 200;
        const offset = (page - 1) * limit;

        // Fetch all products from 5 tables
        const [eyewear, jewellery, clothing, footwear, purse] = await Promise.all([
            Eyewear.findAll({ order: [["createdAt", "DESC"]], limit: 200 }),
            Jewellery.findAll({ order: [["createdAt", "DESC"]], limit: 200 }),
            Clothing.findAll({ order: [["createdAt", "DESC"]], limit: 200 }),
            Footwear.findAll({ order: [["createdAt", "DESC"]], limit: 200 }),
            Purse.findAll({ order: [["createdAt", "DESC"]], limit: 200 }),
        ]);

        const addCategory = (data, categoryName) => {
            return data.map((p) => ({
                ...p.toJSON(),
                category: categoryName,
            }));
        };

        const allProducts = [
            ...addCategory(eyewear, "eyewear"),
            ...addCategory(jewellery, "jewellery"),
            ...addCategory(clothing, "clothing"),
            ...addCategory(footwear, "footwear"),
            ...addCategory(purse, "purse"),
        ];


        const totalProducts = allProducts.length;
        const paginatedData = allProducts.slice(offset, offset + limit);

        res.status(200).json({
            page,
            limit,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            data: paginatedData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
};

exports.primiumProduct = async (req, res) => {
    try {
        const [jewellery, clothing, footwear, purse, products] = await Promise.all([
            // Eyewear.findAll({ order: [["createdAt", "DESC"]], limit: 20 }),
            Jewellery.findAll({ order: [["createdAt", "DESC"]] }),
            Clothing.findAll({ order: [["createdAt", "DESC"]] }),
            Footwear.findAll({ order: [["createdAt", "DESC"]] }),
            Purse.findAll({ order: [["createdAt", "DESC"]] }),
            Products.findAll({ order: [["createdAt", "DESC"]] }),
        ]);

        // Sabko merge karo
        const allProducts = [
            // ...addCategory(eyewear, "eyewear"),
            ...addCategory(jewellery, "jewellery"),
            ...addCategory(clothing, "clothing"),
            ...addCategory(footwear, "footwear"),
            ...addCategory(purse, "purse"),
            ...addCategory(products, "products"),
        ];


        const finalProducts = allProducts.slice(0, 10);

    } catch (error) {
        console.error("Error fetching single product:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.getLatestMixedProducts = async (req, res) => {
    try {
        const [jewellery, clothing, footwear, purse, products] = await Promise.all([
            // Eyewear.findAll({ order: [["createdAt", "DESC"]], limit: 20 }),
            Jewellery.findAll({ order: [["createdAt", "DESC"]], limit: 2 }),
            Clothing.findAll({ order: [["createdAt", "DESC"]], limit: 2 }),
            Footwear.findAll({ order: [["createdAt", "DESC"]], limit: 2 }),
            Purse.findAll({ order: [["createdAt", "DESC"]], limit: 2 }),
            Products.findAll({ order: [["createdAt", "DESC"]], limit: 2 }),
        ]);

        const addCategory = (data, categoryName) => {
            return data.map((p) => ({
                ...p.toJSON(),
                category: categoryName,
            }));
        };

        // Sabko merge karo
        const allProducts = [
            // ...addCategory(eyewear, "eyewear"),
            ...addCategory(jewellery, "jewellery"),
            ...addCategory(clothing, "clothing"),
            ...addCategory(footwear, "footwear"),
            ...addCategory(purse, "purse"),
            ...addCategory(products, "products"),
        ];

        // 🔥 First latest, then random mix 
        allProducts.sort(() => Math.random() - 0.5);

        // Sirf 20 products return 
        const finalProducts = allProducts.slice(0, 10);

        res.status(200).json({
            total: finalProducts.length,
            data: finalProducts,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
};


exports.getSingleProduct = async (req, res) => {
    const modelMap = {
        eyewear: Eyewear, jewellery: Jewellery, clothings: Clothing,
        footwear: Footwear, purse: Purse,
    };

    try {
        let { category, product_id } = req.params;
        category = category.toLowerCase();

        // Validate category
        if (!modelMap[category]) {
            return res.status(400).json({
                message: "Invalid category",
                validCategories: Object.keys(modelMap)
            });
        }

        const Model = modelMap[category];

        // --------- Step 1: Fetch Single Product ----------
        const product = await Model.findOne({ where: { product_id } });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                category,
                product_id
            });
        }

        // --------- Step 2: Fetch Suggested Products ----------
        let suggestedProducts = await Model.findAll({
            where: {
                product_id: { [Op.ne]: product_id }, // exclude current product
                main_category: product.main_category // same category suggestion
            },
            limit: 4
        });

        // --------- Step 3: If no suggestions, fetch random 4 products ----------
        if (!suggestedProducts || suggestedProducts.length === 0) {
            suggestedProducts = await Model.findAll({
                where: { product_id: { [Op.ne]: product_id } },
                limit: 4,
                order: Sequelize.literal('RAND()')  // MySQL only
            });
        }

        // Final Response
        return res.status(200).json({
            message: "Product fetched successfully",
            data: product,
            suggestedProducts
        });

    } catch (error) {
        console.error("Error fetching single product:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



