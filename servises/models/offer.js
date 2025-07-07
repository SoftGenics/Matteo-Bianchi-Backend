const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../connection/database"); // Import your Sequelize instance

const Products = require('./product'); // Import the "Product" model

const Offer = database.define('offer', {
  offer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  discountType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discountValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  termsAndConditions: {
    type: DataTypes.TEXT,
    allowNull: false,


  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

},

  {
    timestamps: false,
    freezeTableName: true,
  });

module.exports = Offer
// module.exports = Offer;
// Create an association between Product and Offer


Offer.belongsToMany(Products, {
  through: 'ProductOffer', // This is the name of the join table
  foreignKey: 'offerId',
});

Products.belongsToMany(Offer, {
  through: 'ProductOffer',
  foreignKey: 'productId',
});

