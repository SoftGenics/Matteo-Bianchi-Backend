const addJewellery = async (req, res) => {
    console.log("call Api addJewellery")

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
            images,
            thumbnail_url,
            video_url,
            video_thumbnail_url,
            stock_status,
            rating,
            total_reviews,
            material_type,
            stone_type,
            weight,
            same_color_type
        } = req.body;

        

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed.' });
    }
};

module.exports = { addJewellery }