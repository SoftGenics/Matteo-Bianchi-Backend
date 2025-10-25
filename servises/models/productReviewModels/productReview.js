const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const productReview = database.define("productReview", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    // 🔗 Foreign Key → Product
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // 🔗 Foreign Key → User (registration table)
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5, 
        },
    },

    review_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = productReview;
