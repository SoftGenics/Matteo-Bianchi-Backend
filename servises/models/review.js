const { database } = require("../connection/database"); // Import your Sequelize instance
const { Sequelize, DataTypes, BelongsTo } = require('sequelize');
const Products = require('./product');
const registration = require('./registration');

const Review = database.define('review', {
    review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER, // Update data type to match the primary key of the 'brand' table
        allowNull: false,
        references: {
            model: Products,
            key: "product_id"
        }
    },

    user_id: {
        type: DataTypes.INTEGER, // Update data type to match the primary key of the 'brand' table
        allowNull: false,
        references: {
            model: registration,
            key: "user_id"
        }
    },

    rating: {
        type: DataTypes.FLOAT,
        allowNull: false

    },
    review_title: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    review_comment: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    review_img: {
        type: DataTypes.STRING,
        allowNull: true

    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Set the default value to the current timestamp
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
},

    {
        timestamps: false,
        freezeTableName: true,

    })

module.exports = Review

// Products.belongsTo (sellers,{foreignKey: "sellers_id"})
Review.belongsTo(Products, { foreignKey: 'product_id' })
Review.belongsTo(registration, { foreignKey: 'user_id' })