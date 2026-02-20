const { Op, Sequelize } = require('sequelize');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bagsDetails = require('../../models/bagsDetailsModels/bagsDetails');

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
}).fields([{ name: 'images', maxCount: 10 }, { name: 'thumbnail_url', maxCount: 1 }, { name: 'video_url', maxCount: 1 },
{ name: 'video_thumbnail_url', maxCount: 1 },]);

const addBags = async (req, res) => {
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
      const bags = await bagsDetails.create({
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
        size_type: req.body.size_type,
        pattern_type: req.body.pattern_type,
        closure_type: req.body.closure_type,
        same_color_type: req.body.same_color_type,
      });

      return res.status(200).json({
        message: 'bagsDetails added successfully',
        data: bags,
      });

    } catch (error) {
      console.error("DB insert failed:", error);

      // ⚠️ Delete uploaded files since DB save failed
      const deleteFile = (filePath) => {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      };
      [...images, thumbnail_url, video_url, video_thumbnail_url].forEach((filePath) => {
        if (filePath) deleteFile(path.resolve(filePath));
      });

      return res.status(500).json({
        message: 'Failed to save bagsDetails, uploaded files deleted.',
        error: error.message,
      });
    }

  });
};

const getBags = async (req, res) => {
  try {
    const bags = await bagsDetails.findAll({
      order: [['createdAt', 'DESC']]
    })

    if (!bags) {
      return res.status(404).json({ message: "Bags not Found" })
    }
    return res.status(200).json({
      message: "Get Bags details Successfully.",
      data: bags
    })
  } catch (error) {
    console.error("internal server error", error)
  }
}

const deleteBags = async (req, res) => {
  const { product_id } = req.params;
  try {
    const bags = await bagsDetails.findOne({ where: { product_id } });
    if (!bags) {
      return res.status(404).json({
        message: "bags product not found.",
        id: product_id,
      });
    }
    const deleteFile = (filePath) => {
      if (filePath && fs.existsSync(path.resolve(filePath))) {
        fs.unlinkSync(path.resolve(filePath));
      }
    };
    if (Array.isArray(bags.images)) {
      bags.images.forEach((imgPath) => deleteFile(imgPath));
    }

    deleteFile(bags.thumbnail_url);
    deleteFile(bags.video_url);
    deleteFile(bags.video_thumbnail_url);

    await bags.destroy();

    return res.status(200).json({
      message: "bags product delete Successfully.",
      id: product_id,
    });
  } catch (error) {
    console.error("Delete bags failed:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateBags = async (req, res) => {
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
      const bags = await bagsDetails.findOne({
        where: {
          product_id
        }
      });

      if (!bags) {
        return res.status(404).json({ message: "Bags product not found" });
      }

      const allimages = req.files?.images || [];
      const thumbnailImage = req.files?.thumbnail_url?.[0] || null;
      const videoFile = req.files?.video_url?.[0] || null;
      const videoThumbnailFile = req.files?.video_thumbnail_url?.[0] || null;


      const thumbnail_url = thumbnailImage ? `uploads/${thumbnailImage.filename}` : bags.thumbnail_url;
      const video_url = videoFile ? `uploads/${videoFile.filename}` : bags.video_url;
      const video_thumbnail_url = videoThumbnailFile ? `uploads/${videoThumbnailFile.filename}` : bags.video_thumbnail_url;
      
      let images = bags.images;
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

      // if new file is here then delete old file 
      const deleteFileIfReplaced = (oldPath, newPath) => {
        if (oldPath && oldPath !== newPath && fs.existsSync(path.resolve(oldPath))) {
          fs.unlinkSync(path.resolve(oldPath));
        }
      };
      deleteFileIfReplaced(bags.thumbnail_url, thumbnail_url);
      deleteFileIfReplaced(bags.video_url, video_url);
      deleteFileIfReplaced(bags.video_thumbnail_url, video_thumbnail_url);
      await bags.update({
        main_category: req.body.main_category || bags.main_category,
        sub_category: req.body.sub_category || bags.sub_category,
        product_name: req.body.product_name || bags.product_name,
        product_type: req.body.product_type || bags.product_type,
        product_variant: req.body.product_variant || bags.product_variant,
        brand_name: req.body.brand_name || bags.brand_name,
        color: req.body.color || bags.color,
        price: req.body.price || bags.price,
        discount_percent: req.body.discount_percent || bags.discount_percent,
        description: req.body.description || bags.description,
        images: images,
        thumbnail_url: thumbnail_url,
        video_url: video_url,
        video_thumbnail_url: video_thumbnail_url,
        stock_status: req.body.stock_status || bags.stock_status,
        rating: req.body.rating || bags.rating,
        total_reviews: req.body.total_reviews || bags.total_reviews,
        material_type: req.body.material_type || bags.material_type,
        size_type: req.body.size_type || bags.size_type,
        pattern_type: req.body.pattern_type || bags.pattern_type,
        closure_type: req.body.closure_type || bags.closure_type,
        same_color_type: req.body.same_color_type || bags.same_color_type,
      });

      return res.status(200).json({
        message: "Bags product updated successfully.",
        product_id,
      });
    } catch (error) {
      console.error("Failed to update bags product:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  });
};



module.exports = { addBags, getBags, deleteBags, updateBags }