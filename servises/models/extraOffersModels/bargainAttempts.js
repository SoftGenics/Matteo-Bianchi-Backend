const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const BargainAttempts = database.define("BargainAttempts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    main_category: {
      type: DataTypes.ENUM(
        "Eyewear",
        "Footwear",
        "Jewellery",
        "Purse",
        "Clothing"
      ),
      allowNull: false,
    },

    offer_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    result: {
      type: DataTypes.ENUM(
        "accepted",
        "counter",
        "rejected"
      ),
      allowNull: false,
    },

    attempt_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
);

module.exports = BargainAttempts;