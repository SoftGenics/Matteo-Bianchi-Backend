const express = require('express');
const route = express.Router();

const categoriesController = require('../controllers/categoriesController')

route.post('/api/categories', categoriesController.postCategories)
route.get('/api/categories/all', categoriesController.getCategories)
route.put('/api/categories/edit/:id', categoriesController.editCategories)
route.delete('/api/categories/delete/:id', categoriesController.deleteCategories)

module.exports = route