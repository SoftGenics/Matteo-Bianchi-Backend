const express = require('express');
const route = express.Router();

const brandController = require('../controllers/brandController');

route.post('/brand', brandController.Addbrand)
route.get('/brand', brandController.getbrand)
route.get('/brand/product/:brandName', brandController.getbrandproduct)
route.delete('/brand/product/delete/:brand_id', brandController.deleteBrandProduct)
route.put('/brand/product/edit/:brand_id', brandController.editBrandProduct)

module.exports = route;