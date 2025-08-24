const express = require('express')
const router = express.Router()
const trackShipmentController = require('../controllers/trackShipmentController')


router.post("/track", trackShipmentController.trackShipment);

module.exports = router;