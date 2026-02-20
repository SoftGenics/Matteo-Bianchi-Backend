const { Op, Sequelize } = require('sequelize');
const multer = require('multer');
const fs = require("fs");
const path = require("path");
const jewelleryDetails = require('../../models/jewelleryDetailsModels/jewelleryDetails')

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
    limits: { fileSize: 100 * 1024 * 1024 }
});

const addJewellery = async (req, res) => {
    try {
        upload.fields([{ name: 'images', maxCount: 10 }, { name: 'thumbnail_url', maxCount: 1 }, { name: 'video_url', maxCount: 1 },
        { name: 'video_thumbnail_url', maxCount: 1 },])(req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(400).json({
                    message: 'File upload failed',
                    error: err.message
                });
            }
            const allimages = req.files['images']
            if (!allimages) {
                return res.status(400).json({ message: 'No files were uploaded for product_thumbnail_img' });
            }
            const images = allimages.map((image) => {
                return `uploads/${image.filename}`;
            });
            const thumbnailImage = req.files['thumbnail_url']?.[0];
            const videoFile = req.files['video_url']?.[0];
            const videoThumbnailFile = req.files['video_thumbnail_url']?.[0];
            const thumbnail_url = thumbnailImage ? `uploads/${thumbnailImage.filename}` : null;
            const video_url = videoFile ? `uploads/${videoFile.filename}` : null;
            const video_thumbnail_url = videoThumbnailFile ? `uploads/${videoThumbnailFile.filename}` : null;
            const jewellery = await jewelleryDetails.create({
                main_category: req.body.main_category,
                sub_category: req.body.sub_category,
                product_name: req.body.product_name,
                product_type: req.body.product_name,
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
                stone_type: req.body.stone_type,
                weight: req.body.weight,
                same_color_type: req.body.same_color_type,
            });
            return res.status(200).json({
                message: 'jewellery added successfully',
                data: jewellery
            });
        })
    } catch (error) {
        console.error("DB insert failed:", error);

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
};

const getJewellery = async (req, res) => {
    try {
        const jewellery = await jewelleryDetails.findAll({
            order: [['createdAt', 'DESC']]
        })
        return res.status(200).json({
            message: 'Get jewellery successfully.',
            data: jewellery
        })
    } catch (error) {
        console.error("faild get request.", error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const deleteJewellery = async (req, res) => {
    const { product_id } = req.params;
    try {
        const jewellery = await jewelleryDetails.findOne({ where: { product_id } });
        if (!jewellery) {
            return res.status(404).json({
                message: "Jewellery product not found.",
                id: product_id,
            });
        }
        const deleteFile = (filePath) => {
            if (filePath && fs.existsSync(path.resolve(filePath))) {
                fs.unlinkSync(path.resolve(filePath));
            }
        };
        if (Array.isArray(jewellery.images)) {
            jewellery.images.forEach((imgPath) => deleteFile(imgPath));
        }

        deleteFile(jewellery.thumbnail_url);
        deleteFile(jewellery.video_url);
        deleteFile(jewellery.video_thumbnail_url);

        await jewellery.destroy({
            where: { product_id },
        });

        return res.status(200).json({
            message: "Jewellery product delete Successfully.",
            id: product_id,
        });
    } catch (error) {
        console.error("Delete jewellery failed:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const updateJewellery = async (req, res) => {
    const { product_id } = req.params
    upload.fields([{ name: "images", maxCount: 10 }, { name: "thumbnail_url", maxCount: 1 }, { name: "video_url", maxCount: 1 },
    { name: "video_thumbnail_url", maxCount: 1 },])(req, res, async (err) => {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json({
                message: "File upload failed.",
                error: err.message,
            });
        }
        try {
            const jewellery = await jewelleryDetails.findOne({
                where: {
                    product_id
                }
            });
            if (!jewellery) {
                return res.status(404).json({ message: "Jewellery product not found." });
            }

            const allimages = req.files?.images || [];
            const thumbnailImage = req.files?.thumbnail_url?.[0] || null;
            const videoFile = req.files?.video_url?.[0] || null;
            const videoThumbnailFile = req.files?.video_thumbnail_url?.[0] || null;

            const thumbnail_url = thumbnailImage ? `uploads/${thumbnailImage.filename}` : jewellery.thumbnail_url;
            const video_url = videoFile ? `uploads/${videoFile.filename}` : jewellery.video_url;
            const video_thumbnail_url = videoThumbnailFile ? `uploads/${videoThumbnailFile.filename}` : jewellery.video_thumbnail_url;

            let images = jewellery.images;
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
            deleteFileIfReplaced(jewellery.thumbnail_url, thumbnail_url);
            deleteFileIfReplaced(jewellery.video_url, video_url);
            deleteFileIfReplaced(jewellery.video_thumbnail_url, video_thumbnail_url);

            await jewellery.update({
                main_category: req.body.main_category || jewellery.main_category,
                sub_category: req.body.sub_category || jewellery.sub_category,
                product_name: req.body.product_name || jewellery.product_name,
                product_type: req.body.product_type || jewellery.product_type,
                product_variant: req.body.product_variant || jewellery.product_variant,
                brand_name: req.body.brand_name || jewellery.brand_name,
                color: req.body.color || jewellery.color,
                price: req.body.price || jewellery.price,
                images,
                thumbnail_url,
                video_url,
                video_thumbnail_url,
                discount_percent: req.body.discount_percent || jewellery.discount_percent,
                description: req.body.description || jewellery.description,
                stock_status: req.body.stock_status || jewellery.stock_status,
                rating: req.body.rating || jewellery.rating,
                total_reviews: req.body.total_reviews || jewellery.total_reviews,
                material_type: req.body.material_type || jewellery.material_type,
                stone_type: req.body.stone_type || jewellery.stone_type,
                weight: req.body.weight || jewellery.weight,
                same_color_type: req.body.same_color_type || jewellery.same_color_type,
            })

            return res.status(200).json({
                message: "Jewellery update Successfully.",
                data: jewellery
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






module.exports = { addJewellery, getJewellery, deleteJewellery, updateJewellery }