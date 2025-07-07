const subCetegories = require('../models/subCategories');

const postsubCetegories = async (req, res) => {
    const categories_name = req.body.categories_name;
    const subCetegories_name = req.body.subCetegories_name;
    const subCetegories_id = req.body.subCetegories_id;

    try {
        if (!categories_name || !subCetegories_name || !subCetegories_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const data = await subCetegories.create({
            categories_name,
            subCetegories_name,   
            subCetegories_id,   
        })
        res.status(200).send(data);

    } catch (error) {
        console.error('Error creating subCetegories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getSubCategories = async (req, res) => {
    try {
        const data = await subCetegories.findAll()
        if (!data) {
            return res.status(400).json({ error: 'subCetegories not found' });
        }
        res.status(200).send(data);
    } catch (error) {
        console.error('Error creating subCetegories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const editSubCategories = async (req, res) => {
    const subCategoriesId = req.params.id;
    const { categories_name, subCetegories_name, subCetegories_id } = req.body;

    console.log(subCategoriesId)

    try {
        const data = subCetegories.findByPk(subCategoriesId)
        if (!data) {
            return res.status(400).json({ error: 'subCetegories id not found' });
        }

        await subCetegories.update({
            categories_name,
            subCetegories_name,
            subCetegories_id,
        }, { where: { id: subCategoriesId, } })

        const updatedSubCat = await subCetegories.findByPk(subCategoriesId)
        res.status(200).json({ updatedBanner: updatedSubCat, message: 'Banner updated successfully' });

    } catch (error) {
        console.error('Error editing subCetegoriesr by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteSubCategories = async (req, res) => {
    const subCategoriesId = req.params.id;
    try {
        const data = await subCetegories.destroy({where:{id:subCategoriesId}})
        if (!data){
            return res.status(400).json({ error: 'subCetegories id not found' });
        }
        res.status(200).send({ id: subCategoriesId, message: 'subCetegories deleted successfully' });
    } catch (error) {
        console.error('Error Delete subCetegoriesr by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { postsubCetegories, getSubCategories, editSubCategories,deleteSubCategories }