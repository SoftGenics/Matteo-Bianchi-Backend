const express = require('express')
const route = express.Router();

const jewelleryDetailsControllers = require('../../controllers/jewelleryDetailsControllers/jewelleryDetailsControllers')

route.post('/jewellery', jewelleryDetailsControllers.addJewellery)
route.get('/jewellery', jewelleryDetailsControllers.getJewellery)
route.delete('/jewellery/:product_id', jewelleryDetailsControllers.deleteJewellery)
route.put('/jewellery/:product_id', jewelleryDetailsControllers.updateJewellery)

module.exports = route;
