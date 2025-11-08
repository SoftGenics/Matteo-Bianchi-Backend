const { Op, Sequelize } = require('sequelize');
const multer = require('multer');
const clothingDetail = require('../../models/clothingDetailModels/clothingDetail')

const addClothings = async (req, res) => {
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

    try {
        upload.fields([
            { name: 'images', maxCount: 10 }, { name: 'thumbnail_url', maxCount: 1 }, { name: 'video_url', maxCount: 1 },
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
                const clothings = await clothingDetail.create({
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
                    size: req.body.size,
                    material_type: req.body.material_type,
                    fabric_type: req.body.fabric_type,
                    fit_type: req.body.fit_type,
                    pattern_type: req.body.pattern_type,
                    same_color_type: req.body.same_color_type,
                    care_instructions: req.body.care_instructions,
                });
                return res.status(200).json({
                    message: 'clothings added successfully',
                    data: clothings
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
            message: 'Failed to save clothings, uploaded files deleted.',
            error: error.message,
        });
    }
};

module.exports = {addClothings}