const express = require('express')
const route = express.Router();

const bargainControllers = require('../../controllers/bargainControllers/bargainsControllers')
const verifyUserToken  = require("../../middleware/varifyUserToken");


route.post('/bargains', bargainControllers.createExtraOffer)
route.get('/bargains', bargainControllers.getAllExtraOffers)
route.put('/bargains/:id', bargainControllers.updateExtraOffer)
route.delete('/bargains/:id', bargainControllers.deleteExtraOffer)
route.post("/check", verifyUserToken, bargainControllers.checkBargain );

module.exports = route;