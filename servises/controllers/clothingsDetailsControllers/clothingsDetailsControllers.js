const { Op, Sequelize } = require("sequelize");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const clothingDetails = require("../../models/clothingDetailModels/clothingDetail");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
}).fields([
  { name: "images", maxCount: 10 },
  { name: "thumbnail_url", maxCount: 1 },
  { name: "video_url", maxCount: 1 },
  { name: "video_thumbnail_url", maxCount: 1 },
]);

// ------------------------ ADD CLOTHING ------------------------
const addClothing = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({
        message: "File upload failed",
        error: err.message,
      });
    }

    const allimages = req.files["images"];
    if (!allimages) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const thumbnailImage = req.files["thumbnail_url"]?.[0];
    const videoFile = req.files["video_url"]?.[0];
    const videoThumbnailFile = req.files["video_thumbnail_url"]?.[0];

    const images = allimages.map((image) => `uploads/${image.filename}`);
    const thumbnail_url = thumbnailImage ? `uploads/${thumbnailImage.filename}` : null;
    const video_url = videoFile ? `uploads/${videoFile.filename}` : null;
    const video_thumbnail_url = videoThumbnailFile
      ? `uploads/${videoThumbnailFile.filename}`
      : null;

    try {
      const clothing = await clothingDetails.create({
        main_category: req.body.main_category,
        sub_category: req.body.sub_category,
        product_name: req.body.product_name,
        product_type: req.body.product_type,
        product_variant: req.body.product_variant,
        brand_name: req.body.brand_name,
        color: req.body.color,
        price: req.body.price,
        discount_percent: req.body.discount_percent,
        description: req.body.description,
        images: images,
        thumbnail_url: thumbnail_url,
        video_url: video_url,
        video_thumbnail_url: video_thumbnail_url,
        stock_status: req.body.stock_status,
        rating: req.body.rating,
        total_reviews: req.body.total_reviews,
        size: JSON.parse(req.body.size),
        material_type: req.body.material_type,
        fabric_type: req.body.fabric_type,
        fit_type: req.body.fit_type,
        pattern_type: req.body.pattern_type,
        same_color_type: req.body.same_color_type,
        care_instructions: req.body.care_instructions,
      });

      return res.status(200).json({
        message: "Clothing added successfully",
        data: clothing,
      });
    } catch (error) {
      console.error("DB insert failed:", error);

      const deleteFile = (filePath) => {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      };

      [...images, thumbnail_url, video_url, video_thumbnail_url].forEach(
        (filePath) => {
          if (filePath) deleteFile(path.resolve(filePath));
        }
      );

      return res.status(500).json({
        message: "Failed to save clothing, uploaded files deleted.",
        error: error.message,
      });
    }
  });
};

// ------------------------ GET CLOTHING ------------------------
const getClothing = async (req, res) => {
  try {
    const clothing = await clothingDetails.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (!clothing) {
      return res.status(404).json({ message: "Clothing not found" });
    }

    return res.status(200).json({
      message: "Get Clothing details successfully.",
      data: clothing,
    });
  } catch (error) {
    console.error("Internal server error", error);
  }
};

// ------------------------ DELETE CLOTHING ------------------------
const deleteClothing = async (req, res) => {
  const { product_id } = req.params;

  try {
    const clothing = await clothingDetails.findOne({ where: { product_id } });

    if (!clothing) {
      return res.status(404).json({
        message: "Clothing product not found.",
        id: product_id,
      });
    }

    const deleteFile = (filePath) => {
      if (filePath && fs.existsSync(path.resolve(filePath))) {
        fs.unlinkSync(path.resolve(filePath));
      }
    };

    if (Array.isArray(clothing.images)) {
      clothing.images.forEach((imgPath) => deleteFile(imgPath));
    }

    deleteFile(clothing.thumbnail_url);
    deleteFile(clothing.video_url);
    deleteFile(clothing.video_thumbnail_url);

    await clothing.destroy({ where: { product_id } });

    return res.status(200).json({
      message: "Clothing product deleted successfully.",
      id: product_id,
    });
  } catch (error) {
    console.error("Delete clothing failed:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ------------------------ UPDATE CLOTHING ------------------------
const updateClothing = async (req, res) => {
  const { product_id } = req.params;

  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({
        message: "File upload failed",
        error: err.message,
      });
    }

    try {
      const clothing = await clothingDetails.findOne({ where: { product_id } });

      if (!clothing) {
        return res.status(404).json({ message: "Clothing product not found" });
      }

      const allimages = req.files?.images || [];
      const thumbnailImage = req.files?.thumbnail_url?.[0] || null;
      const videoFile = req.files?.video_url?.[0] || null;
      const videoThumbnailFile = req.files?.video_thumbnail_url?.[0] || null;

      const thumbnail_url = thumbnailImage ? `uploads/${thumbnailImage.filename}` : clothing.thumbnail_url;
      const video_url = videoFile ? `uploads/${videoFile.filename}` : clothing.video_url;
      const video_thumbnail_url = videoThumbnailFile ? `uploads/${videoThumbnailFile.filename}` : clothing.video_thumbnail_url;

      let images = clothing.images;
      if (allimages.length > 0) {
        // delete old images
        if (Array.isArray(bags.images)) {
          bags.images.forEach((oldPath) => {
            const fullPath = path.resolve(oldPath);
            if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
          });
        }

        // set new images
        images = allimages.map((image) => `uploads/${image.filename}`);
      }

      const deleteFileIfReplaced = (oldPath, newPath) => {
        if (oldPath && oldPath !== newPath && fs.existsSync(path.resolve(oldPath))) {
          fs.unlinkSync(path.resolve(oldPath));
        }
      };

      deleteFileIfReplaced(clothing.thumbnail_url, thumbnail_url);
      deleteFileIfReplaced(clothing.video_url, video_url);
      deleteFileIfReplaced(clothing.video_thumbnail_url, video_thumbnail_url);

      await clothing.update({
        main_category: req.body.main_category || clothing.main_category,
        sub_category: req.body.sub_category || clothing.sub_category,
        product_name: req.body.product_name || clothing.product_name,
        product_type: req.body.product_type || clothing.product_type,
        product_variant: req.body.product_variant || clothing.product_variant,
        brand_name: req.body.brand_name || clothing.brand_name,
        color: req.body.color || clothing.color,
        price: req.body.price || clothing.price,
        discount_percent: req.body.discount_percent || clothing.discount_percent,
        description: req.body.description || clothing.description,

        images: images,
        thumbnail_url: thumbnail_url,
        video_url: video_url,
        video_thumbnail_url: video_thumbnail_url,

        stock_status: req.body.stock_status || clothing.stock_status,
        rating: req.body.rating || clothing.rating,
        total_reviews: req.body.total_reviews || clothing.total_reviews,

        size: req.body.size ? JSON.parse(req.body.size) : clothing.size,
        material_type: req.body.material_type || clothing.material_type,
        fabric_type: req.body.fabric_type || clothing.fabric_type,
        fit_type: req.body.fit_type || clothing.fit_type,
        pattern_type: req.body.pattern_type || clothing.pattern_type,
        same_color_type: req.body.same_color_type || clothing.same_color_type,
        care_instructions: req.body.care_instructions || clothing.care_instructions,
      });

      return res.status(200).json({
        message: "Clothing product updated successfully.",
        product_id,
      });
    } catch (error) {
      console.error("Failed to update clothing:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  });
};

module.exports = { addClothing, getClothing, deleteClothing, updateClothing };
