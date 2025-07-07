const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../connection/database"); // Import your Sequelize instance

const slider = database.define('slider', {
    description_slider: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    slider_link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slider_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slider_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = slider;