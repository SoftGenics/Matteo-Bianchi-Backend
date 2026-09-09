const productLink = require("../../models/productLink/productLink");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ---------------- MULTER STORAGE ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Sirf ek image
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
}).single("image");


// ---------------- ADD PRODUCT LINK ----------------
const addProductLink = async (req, res) => {
  upload(req, res, async (err) => {
    // Multer error
    if (err) {
      console.error("Multer error:", err);

      return res.status(400).json({
        message: "Image upload failed",
        error: err.message,
      });
    }

    try {
      // Image required hai
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload an image",
        });
      }

      const { product_id, main_category, price, link, } = req.body;

      // Required fields validation
      if (!product_id || !price || !link) {
        const imagePath = path.resolve(
          "uploads",
          req.file.filename
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

        return res.status(400).json({
          message: "product_id, price and link are required",
        });
      }

      // Image ka path
      const image = `uploads/${req.file.filename}`;

      // Database me save
      const product = await productLink.create({
        product_id,
        main_category: main_category || null,
        price,
        link,
        image,
      });

      return res.status(201).json({
        message: "Product added successfully",
        data: product,
      });

    } catch (error) {
      console.error("Database insert failed:", error);

      // Error aane par uploaded image delete
      if (req.file) {
        const imagePath = path.resolve(
          "uploads",
          req.file.filename
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      return res.status(500).json({
        message: "Failed to add product",
        error: error.message,
      });
    }
  });
};

const getAllProductLinks = async (req, res) => {
  try {
    const products = await productLink.findAll({
      order: [
        ["createdAt", "DESC"],
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Product links fetched successfully",
      count: products.length,
      data: products,
    });

  } catch (error) {
    console.error(
      "Get product links error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product links",
      error: error.message,
    });
  }
};

module.exports = { addProductLink, getAllProductLinks };
