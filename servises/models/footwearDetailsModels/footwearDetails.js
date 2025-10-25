const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const footwearDetails = database.define("ProductDetailsFootwear", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING
    },
    sole_type: {
        type: DataTypes.STRING
    },
    size_type: {
        type: DataTypes.JSON
    },
    closure_type: {
        type: DataTypes.STRING
    },
    same_color_type: {
        type: DataTypes.STRING
    },

});

module.exports = footwearDetails;
