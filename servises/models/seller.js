// Registration.js
const { Sequelize, DataTypes } = require('sequelize');
const {database} = require("../connection/database"); // Import your Sequelize instance

const seller = database.define('seller', {
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: true,
    
  },
  brand_name: {
    type: DataTypes.STRING,
    // unique: true,
     allowNull: true,
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brand_usp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  marketplaces: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false, // or true if the status can be null
    defaultValue: false // or true based on the default value you prefe
  },
  

},
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = seller;