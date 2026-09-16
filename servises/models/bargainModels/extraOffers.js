const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const extraOffers = database.define("extraOffers", {
  main_category: {
    type: DataTypes.ENUM(
      "products",
      "footwear",
      "jewellery",
      "purse",
      "clothings",
      "eyewear"
    ),
    allowNull: false,
  },

  max_discount_percent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  attempt_limit: {
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

module.exports = extraOffers;