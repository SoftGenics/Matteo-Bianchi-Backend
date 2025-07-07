const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../connection/database"); // Import your Sequelize instance

const brand = database.define('brand', {

    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    brand_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    section:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    
    place:{
        type:DataTypes.STRING,
        allowNull: false,
    },

}, {
    timestamps: false,
    freezeTableName: true,
})

module.exports = brand