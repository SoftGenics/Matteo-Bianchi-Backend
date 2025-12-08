const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../connection/database");

const Cashfree = database.define('Cashfree', {
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tracking_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    main_category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    selected_Lens_Or_ProductPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    delivery_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_quantity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    selected_address_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});


module.exports = Cashfree;
