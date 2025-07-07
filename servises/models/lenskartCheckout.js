const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../connection/database");
const lenskartPayment = require('./lenskartPayment');

const LenskartCheckout = database.define('LenskartCheckout', {
    add: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    axis: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    left_cyl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    left_sph: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    right_cyl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    right_sph: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    selectLansType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    selected_type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    selected_Lens_Or_ProductPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Use a sensible default
    },    
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    traking_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    delivery_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    frem_color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lens_color: {
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
    
    
    paymentId: { // Explicitly defining the foreign key 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: lenskartPayment,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    timestamps: true,
});

// Define associations
LenskartCheckout.belongsTo(lenskartPayment, { foreignKey: 'paymentId', onDelete: 'CASCADE' });
lenskartPayment.hasMany(LenskartCheckout, { foreignKey: 'paymentId' });

module.exports = LenskartCheckout;
