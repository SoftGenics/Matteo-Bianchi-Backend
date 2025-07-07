const express = require('express');
const route = express.Router();

const itemController = require('../controllers/itemController')

route.post('/api/item', itemController.postItem)
route.get('/api/item/all', itemController.getItem)
route.put('/api/item/edit/:id', itemController.editItem)
route.delete('/api/item/delete/:id', itemController.deleteItem)

module.exports = route