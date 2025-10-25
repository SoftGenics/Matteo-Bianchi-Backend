const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const clothingDetails = database.define("clothingDetails", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    size: {
        type: DataTypes.JSON
    },
    material_type: {
        type: DataTypes.STRING
    },
    fabric_type: {
        type: DataTypes.STRING
    },
    fit_type: {
        type: DataTypes.STRING
    },
    pattern_type: {
        type: DataTypes.STRING
    },
    same_color_type: {
        type: DataTypes.STRING
    },
    care_instructions: {
        type: DataTypes.TEXT
    }
});

module.exports = clothingDetails;
