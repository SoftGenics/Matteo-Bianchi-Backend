const brand = require('../models/brand');

const product = require('../models/product');
// const review = require('../models/Review')
// Product.hasMany(review, { foreignKey: 'product_id' }); // Define the association

const Addbrand = async (req, res) => {
    try {
        const { brand_name, section, place } = req.body;

        // Check if brand_name and brand_type are present in req.body
        if (!brand_name || !section || !place) {
            return res.status(400).json({ message: 'Both brand_name and brand_type are required fields' });
        }

        const result = await brand.create({
            brand_name: brand_name,
            section: section,
            place: place
        });

        // console.log(JSON.parse(JSON.stringify(result)))
        res.status(201).json({
            msg: 'success post',
            result: result
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getbrand = async (req, res) => {

    try {
        const result = await brand.findAll();
        // res.json(products);
        // console.log(result,"pppppppp")
        if (!result) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        return res.status(200).send({
            success: 'success',
            result: result,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

const getbrandproduct = async (req, res) => {
    try {
        const brandName = req.params.brandName;

        // Find the brand based on the brand name
        const brand = await brand.findOne({
            where: {
                brand_name: brandName,
            },
        });
        // console.log(brand,'brand')
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        // Find all products associated with the brand
        const products = await product.findAll({
            where: {
                brand_id: brand.brand_id,
            },
            include: [
                {
                    model: review, // Assuming you have a relationship between Products and Review
                },
            ],

        });

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteBrandProduct = async(req, res) => {
    const bannerId = req.params.brand_id;

    try {
        // Find the banner by its ID and delete it
        const deletedBrand = await brand.destroy({ where: { brand_id: bannerId } });

        if (!deletedBrand) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Respond with a success message
        res.status(200).send({ brand_id: bannerId, message: 'Banner deleted successfully' });
    } catch (error) {
        console.error('Error deleting carousel banner by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const editBrandProduct = async(req, res) => {
    const brand_id = req.params.brand_id;
    
    const { brand_name, section, place } = req.body;
    console.log("first", brand_name)
    console.log("section", section)
    console.log("place", place)
    
    try {
        const data = await brand.findByPk(brand_id)
        if(!data){
            res.status(400).json({error: 'item not found by id'})
        }
        await brand.update({
            brand_name,
            section,
            place
        }, {where: {brand_id: brand_id}})

        const updatedItem = await brand.findByPk(brand_id)
        res.status(200).json({ updatedItem: updatedItem, message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error Get item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    Addbrand,
    getbrand,
    getbrandproduct,
    deleteBrandProduct,
    editBrandProduct
}