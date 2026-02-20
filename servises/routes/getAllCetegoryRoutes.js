const express = require("express");
const route = express.Router();
const getAllCetegoryController = require("../controllers/getAllCetegoryController");

route.get("/allCetegory", getAllCetegoryController.getAllCetegory);
route.get("/allCetegory/mix", getAllCetegoryController.getLatestMixedProducts);
route.get("/allProduct", getAllCetegoryController.getAllSearchCategory);
route.get("/product/:category/:product_id", getAllCetegoryController.getSingleProduct);

module.exports = route;
