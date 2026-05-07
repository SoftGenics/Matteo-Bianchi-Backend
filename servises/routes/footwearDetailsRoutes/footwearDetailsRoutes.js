const express = require('express');
const route = express.Router();

const footwearDetailsControllers = require('../../controllers/footwearDetailsControllers/footwearDetailsControllers');
const checkPermission = require('../../middleware/checkPermission')
const verifyAdminToken = require('../../middleware/verifyAdminToken')

route.post('/footwear', checkPermission('footwear'), footwearDetailsControllers.addFootwear);
route.get('/footwear', footwearDetailsControllers.getFootwear);
route.get('/current/seller/footwear', verifyAdminToken, footwearDetailsControllers.currentSellerFootwear)
route.delete('/footwear/:product_id', checkPermission('footwear'), footwearDetailsControllers.deleteFootwear);
route.put('/footwear/:product_id', checkPermission('footwear'), footwearDetailsControllers.updateFootwear);

module.exports = route;
