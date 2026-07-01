const express = require('express');
const route = express.Router();


const shiprocketOrderController  = require("../controllers/shiprocketOrderController");

route.post("/accept/:orderId", shiprocketOrderController.acceptOrder);

module.exports = route;