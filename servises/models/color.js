const { Sequelize, DataTypes } = require('sequelize');
const {database} = require("../connection/database"); 

const Color = database.define('color', {
    color_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    color_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Color;