const express = require('express')
const route = express.Router();

const productLinkControllers = require('../../controllers/productLinkController/productLinkController')

route.post('/product/link',  productLinkControllers.addProductLink)
route.get('/product/link', productLinkControllers.getAllProductLinks)

module.exports = route;