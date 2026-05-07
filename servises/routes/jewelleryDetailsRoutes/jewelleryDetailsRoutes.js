const express = require('express')
const route = express.Router();

const jewelleryDetailsControllers = require('../../controllers/jewelleryDetailsControllers/jewelleryDetailsControllers')
const checkPermission = require('../../middleware/checkPermission')
const verifyAdminToken = require('../../middleware/verifyAdminToken')

route.post('/jewellery', checkPermission('jewellery'), jewelleryDetailsControllers.addJewellery)
route.get('/jewellery', jewelleryDetailsControllers.getJewellery)
route.get('/current/seller/jewellery', verifyAdminToken, jewelleryDetailsControllers.currentSellerJewellery)

route.delete('/jewellery/:product_id', checkPermission('jewellery'), jewelleryDetailsControllers.deleteJewellery)
route.put('/jewellery/:product_id', checkPermission('jewellery'), jewelleryDetailsControllers.updateJewellery)

module.exports = route;
