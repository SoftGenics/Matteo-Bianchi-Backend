const express = require("express");
const route = express.Router();

const clothingControllers = require("../../controllers/clothingsDetailsControllers/clothingsDetailsControllers");
const checkPermission = require('../../middleware/checkPermission')
const verifyAdminToken = require('../../middleware/verifyAdminToken')

route.post("/clothing", checkPermission('clothing'), clothingControllers.addClothing);
route.get("/clothing", clothingControllers.getClothing);
route.get('/current/seller/clothing', verifyAdminToken, clothingControllers.currentSellerClothing)
route.delete("/clothing/:product_id", checkPermission('clothing'), clothingControllers.deleteClothing);
route.put("/clothing/:product_id", checkPermission('clothing'), clothingControllers.updateClothing);

module.exports = route;
