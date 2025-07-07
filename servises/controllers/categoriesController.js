const cetegories = require('../models/categories')

const postCategories = async (req, res) => {
    console.log("api categoris")
    const categories_name = req.body.categories_name;

    try {
        // Check if all required fields are provided
        if (!categories_name ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new carousel banner
        const data = await cetegories.create({
            categories_name,
        });

        // Respond with the created banner
        res.status(200).send(data);
    } catch (error) {
        console.error('Error creating cetogiries table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getCategories = async (req, res) => {
    const data = await cetegories.findAll();
    try {
        if(!data){
            return res.status(404).json({ error: 'cetegories not found' });
        }
        res.status(200).send(data);
    } catch (error) {
        console.error('Error get cetogiries table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

const editCategories = async (req, res) => {
    const cetegoriesId = req.params.id;
    const {categories_name, categories_id} = req.body;
    console.log(cetegoriesId)
    console.log(categories_name)
    console.log(categories_id)

    try {
        const data = cetegories.findByPk(cetegoriesId);
        if (!data) {
            return res.status(404).json({ error: 'categories not found' });
        }
        // Update the banner's properties
        await cetegories.update({
            categories_name,
            categories_id,
        }, {
            where: {
                id: cetegoriesId,
            },
        }
        );
        const updatedData = await cetegories.findByPk(cetegoriesId);
        res.status(200).json({ categories: updatedData, message: 'categories updated successfully' });
    } catch (error) {
        console.error('Error edit cetogiries table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteCategories = async (req, res) => {
    const cetegoriesId = req.params.id;
    try {
        // Find the banner by its ID and delete it
        const deletedCategories = await cetegories.destroy({ where: { id: cetegoriesId } });

        if (!deletedCategories) {
            return res.status(404).json({ error: 'Categories not found' });
        }

        // Respond with a success message
        res.status(200).send({ id: cetegoriesId, message: 'Categories deleted successfully' });
    } catch (error) {
        console.error('Error deleting Categories by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {postCategories, getCategories, editCategories, deleteCategories}