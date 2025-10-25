const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const jewelleryDetails = database.define("jewelleryDetails", {
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
        type: DataTypes.STRING
    },
    stone_type: {
        type: DataTypes.STRING
    },
    weight: {
        type: DataTypes.STRING
    },
    same_color_type: {
        type: DataTypes.STRING
    }
});

module.exports = jewelleryDetails;
