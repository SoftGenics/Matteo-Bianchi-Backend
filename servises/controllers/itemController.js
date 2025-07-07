const item = require('../models/item');

const postItem = async (req, res) => {
    const subCetegories_name = req.body.subCetegories_name;
    const item_name = req.body.item_name;
    const item_id = req.body.item_id;

    try {
        if(!subCetegories_name || !item_name || !item_id){
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const data = await item.create({
            subCetegories_name,
            item_name,
            item_id,
        })
        res.status(200).send(data);
    } catch (error) {
        console.error('Error creating subCetegories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getItem = async (req, res) => {
    try {
        const data = await item.findAll()
        if (!data){
            return res.status(400).json({ error: 'Missing Data not found' });
        }
        res.status(200).send(data);
    } catch (error) {
        console.error('Error Get item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const editItem = async (req, res) => {
    const itemId = req.params.id;
    const {subCetegories_name, item_name, item_id} = req.body;
    try {
        const data = await item.findByPk(itemId)
        if(!data){
            res.status(400).json({error: 'item not found by id'})
        }
        await item.update({
            subCetegories_name,
            item_name,
            item_id,
        }, {where: {id: itemId}})
        const updatedItem = await item.findByPk(itemId)
        res.status(200).json({ updatedItem: updatedItem, message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error Get item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteItem = async (req, res) => {
    const itemId = req.params.id;
    try {
        const data = await item.destroy({where:{id:itemId}})
        if(!data){
            res.status(400).json({error: 'item not found by id'})
        }
        res.status(200).send({ id: itemId, message: 'item deleted successfully' });

    } catch (error) {
        console.error('Error Get item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {postItem, getItem, editItem, deleteItem}