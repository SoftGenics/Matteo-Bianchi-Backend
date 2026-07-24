const express = require('express');
const route = express.Router();


const shiprocketOrderController  = require("../controllers/shiprocketOrderController");

route.post("/accept/:order_id", shiprocketOrderController.acceptOrder);
route.post("/track-shipment", shiprocketOrderController.trackOrder);

module.exports = route;