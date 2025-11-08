const express = require('express')
const route = express.Router();

const eyewearDetailsControllers = require('../../controllers/eyewearDetailsControllers/eyewearDetailsControllers')

route.post('/eyewear', eyewearDetailsControllers.addEyewear)
route.get('/eyewear', eyewearDetailsControllers.getEyewear)
route.delete('/eyewear/:product_id', eyewearDetailsControllers.deleteEyewear)
route.put('/eyewear/:product_id', eyewearDetailsControllers.updateEyewear)

module.exports = route;
