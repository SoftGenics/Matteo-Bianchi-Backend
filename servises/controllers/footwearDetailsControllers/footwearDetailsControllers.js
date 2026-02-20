const { Op, Sequelize } = require('sequelize');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const footwearDetails = require('../../models/footwearDetailsModels/footwearDetails');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
}).fields([
  { name: 'images', maxCount: 10 },
  { name: 'thumbnail_url', maxCount: 1 },
  { name: 'video_url', maxCount: 1 },
  { name: 'video_thumbnail_url', maxCount: 1 },
]);

const addFootwear = async (req, res) => {
  console.log("REQ BODY:", req.body);

  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({
        message: 'File upload failed',
        error: err.message
      });
    }

    const allimages = req.files['images'];
    if (!allimages) {
      return res.status(400).json({ message: 'No images uploaded' });
    }
    const thumbnailImage = req.files['thumbnail_url']?.[0];
    const videoFile = req.files['video_url']?.[0];
    const videoThumbnailFile = req.files['video_thumbnail_url']?.[0];
    const images = allimages.map((image) => `uploads/${image.filename}`);
    const thumbnail_url = thumbnailImage ? `uploads/${thumbnailImage.filename}` : null;
    const video_url = videoFile ? `uploads/${videoFile.filename}` : null;
    const video_thumbnail_url = videoThumbnailFile ? `uploads/${videoThumbnailFile.filename}` : null;

    try {
      const footwear = await footwearDetails.create({
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

        material_type: req.body.material_type,
        sole_type: req.body.sole_type,
        size_type: req.body.size_type,
        closure_type: req.body.closure_type,
        same_color_type: req.body.same_color_type,
        heel_height: req.body.heel_height,
      });

      return res.status(200).json({
        message: 'footwearDetails added successfully',
        data: footwear,
      });

    } catch (error) {
      console.error("DB insert failed:", error);

      const deleteFile = (filePath) => {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      };
      [...images, thumbnail_url, video_url, video_thumbnail_url].forEach((filePath) => {
        if (filePath) deleteFile(path.resolve(filePath));
      });

      return res.status(500).json({
        message: 'Failed to save footwearDetails, uploaded files deleted.',
        error: error.message,
      });
    }

  });
};

const getFootwear = async (req, res) => {
  try {
    const footwear = await footwearDetails.findAll({
      order: [['createdAt', 'DESC']]
    })

    if (!footwear) {
      return res.status(404).json({ message: "Footwear not Found" })
    }
    return res.status(200).json({
      message: "Get Footwear details Successfully.",
      data: footwear
    })
  } catch (error) {
    console.error("internal server error", error)
  }
}

const deleteFootwear = async (req, res) => {
  const { product_id } = req.params;
  try {
    const footwear = await footwearDetails.findOne({ where: { product_id } });
    if (!footwear) {
      return res.status(404).json({
        message: "footwear product not found.",
        id: product_id,
      });
    }

    const deleteFile = (filePath) => {
      if (filePath && fs.existsSync(path.resolve(filePath))) {
        fs.unlinkSync(path.resolve(filePath));
      }
    };

    if (Array.isArray(footwear.images)) {
      footwear.images.forEach((imgPath) => deleteFile(imgPath));
    }

    deleteFile(footwear.thumbnail_url);
    deleteFile(footwear.video_url);
    deleteFile(footwear.video_thumbnail_url);

    await footwear.destroy();

    return res.status(200).json({
      message: "footwear product delete Successfully.",
      id: product_id,
    });
  } catch (error) {
    console.error("Delete footwear failed:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateFootwear = async (req, res) => {
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
      const footwear = await footwearDetails.findOne({
        where: { product_id }
      });

      if (!footwear) {
        return res.status(404).json({ message: "Footwear product not found" });
      }

      const allimages = req.files?.images || [];
      const thumbnailImage = req.files?.thumbnail_url?.[0] || null;
      const videoFile = req.files?.video_url?.[0] || null;
      const videoThumbnailFile = req.files?.video_thumbnail_url?.[0] || null;

      const thumbnail_url = thumbnailImage ? `uploads/${thumbnailImage.filename}` : footwear.thumbnail_url;
      const video_url = videoFile ? `uploads/${videoFile.filename}` : footwear.video_url;
      const video_thumbnail_url = videoThumbnailFile ? `uploads/${videoThumbnailFile.filename}` : footwear.video_thumbnail_url;

      let images = footwear.images;
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

      deleteFileIfReplaced(footwear.thumbnail_url, thumbnail_url);
      deleteFileIfReplaced(footwear.video_url, video_url);
      deleteFileIfReplaced(footwear.video_thumbnail_url, video_thumbnail_url);

      await footwear.update({
        main_category: req.body.main_category || footwear.main_category,
        sub_category: req.body.sub_category || footwear.sub_category,
        product_name: req.body.product_name || footwear.product_name,
        product_type: req.body.product_type || footwear.product_type,
        product_variant: req.body.product_variant || footwear.product_variant,
        brand_name: req.body.brand_name || footwear.brand_name,
        color: req.body.color || footwear.color,
        price: req.body.price || footwear.price,
        discount_percent: req.body.discount_percent || footwear.discount_percent,
        description: req.body.description || footwear.description,
        images: images,
        thumbnail_url: thumbnail_url,
        video_url: video_url,
        video_thumbnail_url: video_thumbnail_url,
        stock_status: req.body.stock_status || footwear.stock_status,
        rating: req.body.rating || footwear.rating,
        total_reviews: req.body.total_reviews || footwear.total_reviews,

        material_type: req.body.material_type || footwear.material_type,
        sole_type: req.body.sole_type || footwear.sole_type,
        size_type: req.body.size_type || footwear.size_type,
        closure_type: req.body.closure_type || footwear.closure_type,
        same_color_type: req.body.same_color_type || footwear.same_color_type,
        heel_height: req.body.heel_height || footwear.heel_height,
      });

      return res.status(200).json({
        message: "Footwear product updated successfully.",
        product_id,
      });
    } catch (error) {
      console.error("Failed to update footwear product:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  });
};

module.exports = { addFootwear, getFootwear, deleteFootwear, updateFootwear }
