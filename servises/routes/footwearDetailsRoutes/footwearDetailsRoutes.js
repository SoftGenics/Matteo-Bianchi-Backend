const express = require('express');
const route = express.Router();

const footwearDetailsControllers = require('../../controllers/footwearDetailsControllers/footwearDetailsControllers');

route.post('/footwear', footwearDetailsControllers.addFootwear);
route.get('/footwear', footwearDetailsControllers.getFootwear);
route.delete('/footwear/:product_id', footwearDetailsControllers.deleteFootwear);
route.put('/footwear/:product_id', footwearDetailsControllers.updateFootwear);

module.exports = route;
