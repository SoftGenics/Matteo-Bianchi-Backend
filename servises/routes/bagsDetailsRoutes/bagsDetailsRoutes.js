const express = require('express')
const route = express.Router();

const bagsDetailsControllers = require('../../controllers/bagsDetailsControllers/bagsDetailsControllers')
const checkPermission = require('../../middleware/checkPermission')
const verifyAdminToken = require('../../middleware/verifyAdminToken')

route.post('/bags', checkPermission('bags'), bagsDetailsControllers.addBags)
route.get('/bags', bagsDetailsControllers.getBags)
route.get('/current/seller/bags', verifyAdminToken, bagsDetailsControllers.currentSellerBags)
route.delete('/bags/:product_id', checkPermission('bags'), bagsDetailsControllers.deleteBags)
route.put('/bags/:product_id', checkPermission('bags'), bagsDetailsControllers.updateBags)

module.exports = route;

