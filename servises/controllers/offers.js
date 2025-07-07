const Products = require('../models/product')
const Offer = require('../models/offer')
const ProductOffer = require('../models/productOffers')

const PostOffer = async (req, res) => {
    console.log('INFO -> PostOffer INFO API CALLED')

    try {
        const { title, description, discount, discountValu, temsCond, selectProductId} = req.body;
        console.log(req.body, 'diwakar kumarrrrrrr')
        // Create the offer in the database
        const newOffer = await Offer.create({
            title,
            description,
            discountValue: discountValu,
            termsAndConditions: temsCond,
            discountType: discount
        });

        // Associate the offer with selected products
        if (selectProductId && selectProductId.length > 0) {
            const products = await Products.findAll({
                where: {
                    product_id: selectProductId,
                },
            });
            await newOffer.addProducts(products);
        }

        res.status(201).json({ message: 'Offer created and products linked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating offer and linking products' });
    }
}

const getproductwithoffer = async (req, res) => {   //feature section all details
    try {
        // Find all products with associated offers
        const productswithoffer = await Products.findAll({
            where: {
                place: 'Featured'
            },
            attributes: { include: ['discount'] }, // Include the discount field from the product model

            include: {
                model: Offer,
                through: ProductOffer,
            },
        });
        // console.log(productswithoffer,'productswithoffer')
        res.json(productswithoffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products with associated offers' });
    }
}

const getproductwithoffersinfo = async (req, res) => {
    try {
        // Find all products with associated offers
        const allofferproduct = await Products.findAll({
            attributes: { include: ['discount'] }, // Include the discount field from the product model

            include: {
                model: Offer,
                through: ProductOffer,
            },
        });
        // console.log(productswithoffer,'productswithoffer')
        res.json(allofferproduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products with associated offers' });
    }
}

module.exports = {
    PostOffer,
    getproductwithoffer,
    getproductwithoffersinfo
}