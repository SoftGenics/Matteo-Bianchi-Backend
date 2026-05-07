const admin_users = require("./adminUsers/adminUsers");
const bagsDetails = require("./bagsDetailsModels/bagsDetails");
const jewelleryDetails = require("./jewelleryDetailsModels/jewelleryDetails");
const eyewearDetails = require('./eyewearDetailsModels/eyewearDetails')
const product = require("./eyewearModels/product");
const footwearDetails = require("./footwearDetailsModels/footwearDetails");
const clothingDetails = require("./clothingDetailModels/clothingDetail");

const db = {};

db.admin_users = admin_users;
db.bagsDetails = bagsDetails;
db.jewelleryDetails = jewelleryDetails;
db.product = product;
db.eyewearDetails = eyewearDetails;
db.footwearDetails = footwearDetails;
db.clothingDetails = clothingDetails;

// 🔥 RUN ASSOCIATIONS
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;