const express = require('express')
const route = express.Router();

const eyewearDetailsControllers = require('../../controllers/eyewearDetailsControllers/eyewearDetailsControllers')
const checkPermission = require('../../middleware/checkPermission')
// const verifyAdminToken = require('../../middleware/verifyAdminToken')

route.post('/eyewear', checkPermission('eyewear'), eyewearDetailsControllers.addEyewear)
route.get('/eyewear', eyewearDetailsControllers.getEyewear)
route.delete('/eyewear/:product_id', checkPermission('eyewear'), eyewearDetailsControllers.deleteEyewear)
route.put('/eyewear/:product_id', checkPermission('eyewear'), eyewearDetailsControllers.updateEyewear)

module.exports = route;
