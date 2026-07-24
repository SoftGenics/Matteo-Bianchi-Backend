const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../connection/database");

const Cashfree = database.define('Cashfree', {
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    main_category: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.ENUM(
            "pending",
            "accepted",
            "pickup_pending",
            "picked_up",
            "in_transit",
            "out_for_delivery",
            "delivered",
            "cancelled",
            "rto",
            "pickup_exception"
        ),
        defaultValue: "pending"
    },

    product_quantity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    selected_address_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    // =========================
    // SHIPROCKET FIELDS
    // =========================
    

    orderStatus: {
        type: DataTypes.ENUM("pending", "accepted", "cancel"),
        defaultValue: "pending"
    },

    tracking_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    shipment_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    courier_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    label_url: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
    
    invoice_url: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },

    pickup_scheduled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

}, {
    timestamps: true,
});


module.exports = Cashfree;
