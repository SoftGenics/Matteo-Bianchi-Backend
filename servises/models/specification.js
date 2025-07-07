const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../connection/database");

const products = require('./product');

const specification = database.define('Specification', {
    Specification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    skin_type: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    hair_type: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    benefits: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    primary_concerns: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: products,
            key: 'product_id',
        },
    },  
});

module.exports = specification;
products.hasOne(specification,{foreignKey:'product_id'});

// specification.belongsTo(products, { foreignKey: 'product_id' });