const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")
const allProduct = require("../allProductModels/allProduct")


const eyewearDetails = database.define("ProductDetailsEyewear", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: allProduct,
            key: "product_id"
        },
        onDelete: "CASCADE"  
    },
    frame_type: {
        type: DataTypes.STRING
    },
    frame_material: {
        type: DataTypes.STRING
    },
    lens_power: {
        type: DataTypes.STRING
    },
    lens_type: {
        type: DataTypes.STRING
    },
    size_type: {
        type: DataTypes.STRING
    },
    same_color_type: {
        type: DataTypes.STRING
    }
});

eyewearDetails.belongsTo(allProduct, { foreignKey: "product_id" });
allProduct.hasOne(eyewearDetails, { foreignKey: "product_id", onDelete: "CASCADE"});

module.exports = eyewearDetails;
