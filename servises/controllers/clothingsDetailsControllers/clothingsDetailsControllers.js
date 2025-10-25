import AllProduct from "../models/allProduct.js";
import ProductDetailsPurse from "../models/productDetailsPurse.js";
import { database } from "../connection/database.js"; // Sequelize instance
import fs from "fs";

// ✅ Product Add Controller (Transaction Safe)
export const addProduct = async (req, res) => {
  const transaction = await database.transaction();

  try {
    const {
      main_category,
      sub_category,
      product_name,
      product_type,
      product_variant,
      brand_name,
      color,
      price,
      discount_percent,
      description,
      stock_status,
      rating,
      total_reviews,
      material_type,
      size_type,
      pattern_type,
      closure_type,
      same_color_type
    } = req.body;

    
    if (!main_category || !sub_category || !product_name || !price) {
      throw new Error("Required product fields missing");
    }

    // 🖼️ multer से मिली files
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Step 1: Product 
    const product = await AllProduct.create({
      main_category,
      sub_category,
      product_name,
      product_type,
      product_variant,
      brand_name,
      color,
      price,
      discount_percent,
      description,
      images,
      stock_status,
      rating,
      total_reviews
    }, { transaction });

    if (main_category.toLowerCase() === "purse") {

      if (!material_type || !size_type || !pattern_type || !closure_type) {
        throw new Error("Purse details missing"); // ❌ transaction rollback trigger
      }

      // Step 2: ProductDetailsPurse
      await ProductDetailsPurse.create({
        product_id: product.product_id,
        material_type,
        size_type,
        pattern_type,
        closure_type,
        same_color_type
      }, { transaction });
    }

    // ✅ सब सही हुआ तो commit
    await transaction.commit();

    res.status(201).json({ message: "Product & details added successfully", product });

  } catch (error) {
    // ❌ Error आया तो rollback
    await transaction.rollback();

    console.error("Transaction failed:", error.message);

    // अगर images upload हुई हैं, तो delete कर दो rollback के बाद
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        const filePath = `uploads/${file.filename}`;
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }

    res.status(400).json({ error: error.message || "Failed to add product" });
  }
};
