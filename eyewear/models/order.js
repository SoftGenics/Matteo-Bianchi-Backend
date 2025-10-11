const { database } = require("../connection/database"); // Import your Sequelize instance
const { Sequelize, DataTypes, BelongsTo } = require('sequelize');
// const orderItem = require('./orderItem')
const registration = require('./registration');


const order = database.define('order', {
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
    },
    CustomerAddress: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    PaymentMethod: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    TransactionID: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    PaymentStatus: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    OrderStatus: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    shipped: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    delivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    ShippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    TrackingNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    ExpectedDeliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    OrderDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    TotalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    DiscountAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: registration,
            key: 'user_id'
        }
    },

});
registration.hasMany(order)
order.belongsTo(registration)
module.exports = order;
