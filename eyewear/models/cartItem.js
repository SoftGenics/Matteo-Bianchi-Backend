const {database} = require("../connection/database");
const { Sequelize, DataTypes } = require('sequelize');
const registration = require('./registration');
const products = require('./product');

const cartItem = database.define('cartItem', {
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: registration,
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: products,
            key: 'product_id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }

},
    {
        freezeTableName: true,
        timestamps: true,

    }
)
module.exports = cartItem;

// Products.hasMany(Cart)
// registration.hasMany(Cart)
// // Cart.belongsTo(Products)
// Cart.belongsTo(registration)

// Cart.belongsTo(Products, { foreignKey: 'product_id' });
