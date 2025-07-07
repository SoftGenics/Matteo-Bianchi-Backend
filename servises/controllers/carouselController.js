const { Op } = require('sequelize');
const carousel = require('../models/carousel');

// const banner = async (req, res) => {
//     const product_categories = req.body.product_categories;
//     const brand_name = req.body.brand_name;
//     const place = req.body.place;
//     const exact_place = req.body.exact_place;
//     const image_url = req.file ? req.file.filename : null;

//     console.log(product_categories)
//     console.log(brand_name)
//     console.log(place)
//     console.log(exact_place)
//     console.log(image_url)

//     try {
//         // Check if all required fields are provided
//         // if (!product_categories || !brand_name || !place || !image_url) {
//         //     return res.status(400).json({ error: 'Missing required fields' });
//         // }

//         if (!exact_place || !place || !image_url) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         // Create a new carousel banner
//         const data = await carousel.create({
//             product_categories,
//             brand_name,
//             place,
//             exact_place,
//             image_url,
//         });

//         // Respond with the created banner
//         res.status(200).send(data);
//     } catch (error) {
//         console.error('Error creating carousel banner:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// }

const banner = async (req, res) => {
    try {
        const { product_categories, section, brand_name, place, exact_place } = req.body;
        const image_url = req.file ? req.file.filename : null;

        console.log(product_categories, brand_name, place, exact_place, image_url);

        // Check if required fields are present
        if (!section || !place || !exact_place || !image_url) {
            return res.status(400).json({ error: 'Missing required fields: place, exact_place, or image_url' });
        }

        // Create new carousel banner
        const data = await carousel.create({
            product_categories: product_categories || "", // Ensure empty string if undefined
            section,
            brand_name: brand_name || "", 
            place,
            exact_place,
            image_url
        });

        return res.status(201).json({ success: true, message: "Banner created successfully!", data });
    } catch (error) {
        console.error("Error creating carousel banner:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const getAllData = async (req, res) => {
    try {
        // Find the banner by its ID
        const data = await carousel.findAll();

        if (!data) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Respond with the found banner
        res.status(200).send(data);
    } catch (error) {
        console.error('Error fetching carousel banner by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const getbyId = async (req, res) => {
    const bannerId = req.params.id;
    try {
        // Find the banner by its ID
        const banner = await carousel.findOne({ where: { id: bannerId } });

        const data = banner.slice(0, 50).map((item) => item);

        if (!data) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Respond with the found banner
        res.status(200).send(data);
    } catch (error) {
        console.error('Error fetching carousel banner by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteBannerById = async (req, res) => {
    const bannerId = req.params.id;

    try {
        // Find the banner by its ID and delete it
        const deletedBanner = await carousel.destroy({ where: { id: bannerId } });

        if (!deletedBanner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Respond with a success message
        res.status(200).send({ id: bannerId, message: 'Banner deleted successfully' });
    } catch (error) {
        console.error('Error deleting carousel banner by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editBannerById = async (req, res) => {
    console.log("edit Api")
    const bannerId = req.params.id;
    const { product_categories, section, brand_name, place, exact_place} = req.body;
    const image_url = req.file ? req.file.filename : null;
    // console.log(req.body.product_categories)
    // console.log(exact_place)
    // console.log(place)
    // console.log(image_url)
    // console.log(brand_name)
    // console.log(req.body)


    try {
        // Find the banner by its ID
        const banner = await carousel.findByPk(bannerId);

        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }
        // Update the banner's properties
        await carousel.update({
            product_categories,
            section,
            brand_name,
            place,
            exact_place,
            image_url,
        }, {
            where: {
                id: bannerId,
            },
        }
        );

        // Respond with the updated banner
        const updatedData = await carousel.findByPk(bannerId);
        res.status(200).json({ updatedBanner: updatedData, message: 'Banner updated successfully' });
    } catch (error) {
        console.error('Error editing carousel banner by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const filterData = async (req, res) => {

    try {
        // Example query parameters: /api/products?product_categories=category&brand_name=brand1
        const queryParameters = req.query;

        // Build a filter object based on query parameters
        const filter = {
            [Op.or]: [],
        };

        // Check if product_categories is present and add it to the filter[Op.or] array
        if (queryParameters.product_categories) {
            filter[Op.or].push({ product_categories: queryParameters.product_categories });
        }

        // Check if brand_name is present and add it to the filter[Op.or] array
        if (queryParameters.brand_name) {
            filter[Op.or].push({ brand_name: queryParameters.brand_name });
        }

        // Fetch products based on the filter
        const data = await carousel.findAll({
            where: filter,
        });

        // Respond with the filtered products
        res.status(200).send(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { banner, getAllData, getbyId, deleteBannerById, editBannerById, filterData }
