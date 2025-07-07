// OrderItem.js
const {database} = require("../connection/database"); // Import your Sequelize instance
const { Sequelize, DataTypes, BelongsTo } = require('sequelize');
const order = require('./order'); // Adjust the file name based on your actual file structure
const product = require('./product');

const orderItem = database.define('orderItem', {
    orderItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: order,
            key: "order_id"
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: product,
            key: 'product_id'
        }
    },
});

order.hasMany(orderItem, { foreignKey: 'orderId' })
orderItem.belongsTo(order, { foreignKey: 'orderId' })
product.hasMany(orderItem, { foreignKey: 'product_id' })
orderItem.belongsTo(product, { foreignKey: 'product_id' })

module.exports = orderItem;
