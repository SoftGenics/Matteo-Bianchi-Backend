const express = require('express')
const route = express.Router();

const bagsDetailsControllers = require('../../controllers/bagsDetailsControllers/bagsDetailsControllers')

route.post('/bags', bagsDetailsControllers.addBags)
route.get('/bags', bagsDetailsControllers.getBags)
route.delete('/bags/:product_id', bagsDetailsControllers.deleteBags)
route.put('/bags/:product_id', bagsDetailsControllers.updateBags)

module.exports = route;
