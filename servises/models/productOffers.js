// ProductOffer.js
const { database } = require("../connection/database"); // Import your Sequelize instance
const { Sequelize, DataTypes } = require('sequelize');

const ProductOffer = database.define('product_offer', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  offerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
    timestamps: false,
    freezeTableName: true,
}

);

module.exports = ProductOffer;