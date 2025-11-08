const express = require('express')
const route = express.Router();

const clothingDetailsControllers = require('../../controllers/clothingsDetailsControllers/clothingsDetailsControllers')

route.post('/clothings', clothingDetailsControllers.addClothings)

module.exports = route;
