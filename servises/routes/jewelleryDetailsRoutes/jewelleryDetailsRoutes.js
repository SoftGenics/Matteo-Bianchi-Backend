const express = require('express')
const route = express.Router();

const jewelleryDetailsControllers = require('../../controllers/jewelleryDetailsControllers/jewelleryDetailsControllers')

route.post('/addJewellery', jewelleryDetailsControllers.addJewellery)


module.exports = route;
