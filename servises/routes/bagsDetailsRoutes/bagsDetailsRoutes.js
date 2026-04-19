const express = require('express')
const route = express.Router();

const bagsDetailsControllers = require('../../controllers/bagsDetailsControllers/bagsDetailsControllers')
const checkPermission = require('../../middleware/checkPermission')

route.post('/bags', bagsDetailsControllers.addBags)
route.get('/bags', bagsDetailsControllers.getBags)
route.delete('/bags/:product_id', checkPermission('bags'), bagsDetailsControllers.deleteBags)
route.put('/bags/:product_id', checkPermission('bags'), bagsDetailsControllers.updateBags)

module.exports = route;

