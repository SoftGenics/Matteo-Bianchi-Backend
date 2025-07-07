const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../connection/database"); // Import your Sequelize instance

const lenskartPayment = database.define('lenskartPayment', {
    razorpay_order_id: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures this field is required
    },
    razorpay_payment_id: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures this field is required
    },
    razorpay_signature: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures this field is required
    },
    date: {
        type: DataTypes.DATE, // To store date and time
        defaultValue: Sequelize.NOW, // Automatically use current timestamp
    },
});

module.exports = lenskartPayment;
