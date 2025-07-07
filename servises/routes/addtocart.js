const express = require('express');
const route = express.Router();

const cartapi = require('../controllers/addtocartController');

route.post('/addProductToCart/', cartapi.addProductToCart)

module.exports = route