const express = require("express");
const route = express.Router();

const clothingControllers = require("../../controllers/clothingsDetailsControllers/clothingsDetailsControllers");

route.post("/clothing", clothingControllers.addClothing);
route.get("/clothing", clothingControllers.getClothing);
route.delete("/clothing/:product_id", clothingControllers.deleteClothing);
route.put("/clothing/:product_id", clothingControllers.updateClothing);

module.exports = route;
