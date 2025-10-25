const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const bagsDetails = database.define("bagsDetails", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    material_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pattern_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    closure_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    same_color_type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = bagsDetails;
