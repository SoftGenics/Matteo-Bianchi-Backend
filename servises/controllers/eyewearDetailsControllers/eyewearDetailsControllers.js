const { Op, Sequelize } = require('sequelize');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const eyewearDetails = require('../../models/eyewearDetailsModels/eyewearDetails')

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

const addEyewear = async (req, res) => {
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
            const eyewear = await eyewearDetails.create({
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

                frame_type: req.body.frame_type,
                material_type: req.body.material_type,
                lens_power: req.body.lens_power,
                lens_type: req.body.lens_type,
                size_type: req.body.size_type,
                same_color_type: req.body.same_color_type,
            });

            return res.status(200).json({
                message: 'Jewellery added successfully',
                data: eyewear,
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
                message: 'Failed to save jewellery, uploaded files deleted.',
                error: error.message,
            });
        }

    });
};

const getEyewear = async (req, res) => {
    try {
        const eyewear = await eyewearDetails.findAll({
            order: [['createdAt', 'DESC']]
        })
        if (!eyewear) {
            return res.status(404).json({
                message: "No eyewear found for given condition.",
            });
        }
        return res.status(200).json({
            message: 'Get jewellery successfully.',
            data: eyewear
        })
    } catch (error) {
        console.error("faild get request.", error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const deleteEyewear = async (req, res) => {
    const { product_id } = req.params;
    try {
        const eyewear = await eyewearDetails.findOne({ where: { product_id } });
        if (!eyewear) {
            return res.status(404).json({
                message: "Eyewear product not found.",
                id: product_id,
            });
        }
        const deleteFile = (filePath) => {
            if (filePath && fs.existsSync(path.resolve(filePath))) {
                fs.unlinkSync(path.resolve(filePath));
            }
        };
        if (Array.isArray(eyewear.images)) {
            eyewear.images.forEach((imgPath) => deleteFile(imgPath));
        }

        deleteFile(eyewear.thumbnail_url);
        deleteFile(eyewear.video_url);
        deleteFile(eyewear.video_thumbnail_url);

        await eyewearDetails.destroy({
            where: { product_id },
        });

        return res.status(200).json({
            message: "Eyewear product delete Successfully.",
            id: product_id,
        });
    } catch (error) {
        console.error("Delete Eyewear failed:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const updateEyewear = async (req, res) => {
    const { product_id } = req.params
    upload(req, res, async (err) => {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json({
                message: "File upload failed.",
                error: err.message,
            });
        }
        try {
            const eyewear = await eyewearDetails.findOne({
                where: {
                    product_id
                }
            });
            if (!eyewear) {
                return res.status(404).json({ message: "eyewear product not found." });
            }

            const allimages = req.files?.images || [];
            const thumbnailImage = req.files?.thumbnail_url?.[0] || null;
            const videoFile = req.files?.video_url?.[0] || null;
            const videoThumbnailFile = req.files?.video_thumbnail_url?.[0] || null;

            const thumbnail_url = thumbnailImage ? `uploads/${thumbnailImage.filename}` : eyewear.thumbnail_url;
            const video_url = videoFile ? `uploads/${videoFile.filename}` : eyewear.video_url;
            const video_thumbnail_url = videoThumbnailFile ? `uploads/${videoThumbnailFile.filename}` : eyewear.video_thumbnail_url;

            let images = eyewear.images;
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
            deleteFileIfReplaced(eyewear.thumbnail_url, thumbnail_url);
            deleteFileIfReplaced(eyewear.video_url, video_url);
            deleteFileIfReplaced(eyewear.video_thumbnail_url, video_thumbnail_url);

            await eyewear.update({
                main_category: req.body.main_category || eyewear.main_category,
                sub_category: req.body.sub_category || eyewear.sub_category,
                product_name: req.body.product_name || eyewear.product_name,
                product_type: req.body.product_type || eyewear.product_type,
                product_variant: req.body.product_variant || eyewear.product_variant,
                brand_name: req.body.brand_name || eyewear.brand_name,
                color: req.body.color || eyewear.color,
                price: req.body.price || eyewear.price,
                images,
                thumbnail_url,
                video_url,
                video_thumbnail_url,
                discount_percent: req.body.discount_percent || eyewear.discount_percent,
                description: req.body.description || eyewear.description,
                stock_status: req.body.stock_status || eyewear.stock_status,
                rating: req.body.rating || eyewear.rating,
                total_reviews: req.body.total_reviews || eyewear.total_reviews,
                frame_type: req.body.frame_type || eyewear.frame_type,
                material_type: req.body.material_type || eyewear.material_type,
                lens_power: req.body.lens_power || eyewear.lens_power,
                lens_type: req.body.lens_type || eyewear.lens_type,
                size_type: req.body.size_type || eyewear.size_type,
                same_color_type: req.body.same_color_type || eyewear.same_color_type,
            })

            return res.status(200).json({
                message: "eyewear update Successfully.",
                data: eyewear
            })
        } catch (error) {
            console.error("Update Jewellery Failed:", error);
            return res.status(500).json({
                message: "Internal Server Error.",
                error: error.message,
            });
        }

    })

}

module.exports = { addEyewear, getEyewear, deleteEyewear, updateEyewear }