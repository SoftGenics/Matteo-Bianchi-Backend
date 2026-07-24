const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const ExtraOffers = database.define("ExtraOffers", {
  category: {
    type: DataTypes.ENUM(
      "Eyewear",
      "Footwear",
      "Jewellery",
      "Bags",
      "Clothing"
    ),
    allowNull: false,
    unique: true,
  },

  max_discount_percent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  counter_buffer: {
    type: DataTypes.INTEGER,
    defaultValue: 20,
  },
  
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = ExtraOffers;