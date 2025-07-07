const specification = require('../models/specification')

const specificationPostData = async (req, res) => {
    const { skin_type, hair_type, benefits, primary_concerns, country, product_id } = req.body;
    console.log("reqbody",req.body)
    
    try {

        const productspecification = await specification.create({
            benefits: benefits,
            primary_concerns: primary_concerns,
            country: country,
            product_id: product_id
        })

        if (skin_type) {
            // console.log(skin_type,'skin_typeskin_type')
            productspecification.skin_type = skin_type
        }

        if (hair_type) {
            productspecification.hair_type = hair_type
        }

        // Save the specification after potential updates
        await productspecification.save();

        return res.json(productspecification);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating Addproductspecification ' });
    }
}

const specificationDataGetbyId = async (req, res) => {
    const product_id = req.params.id; // Assuming the ID is provided as a route parameter
    console.log(product_id)
    try {
        const foundSpecification = await specification.findOne({where:{product_id: product_id}});
        if (!foundSpecification) {
            return res.status(404).json({ message: 'Specification not found' });
        }
        return res.json(foundSpecification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching specification by ID' });
    }
}

const specificationDeleteById = async (req, res) => {
    const product_id = req.params.id; // Assuming the ID is provided as a route parameter
    console.log(product_id);
    try {
        const deletedCount = await specification.destroy({ where: { product_id: product_id } });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Specification not found for deletion' });
        }

        return res.json({ message: 'Specification deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting specification by ID' });
    }
}

module.exports = { specificationPostData, specificationDataGetbyId, specificationDeleteById }