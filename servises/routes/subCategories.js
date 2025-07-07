const express = require('express');
const route = express.Router();

const subCategories = require('../controllers/subCategoriesController');

route.post('/api/subCategories', subCategories.postsubCetegories);
route.get('/api/subCategories/all', subCategories.getSubCategories);
route.put('/api/subCategories/edit/:id', subCategories.editSubCategories);
route.delete('/api/subCategories/delete/:id', subCategories.deleteSubCategories);

module.exports = route