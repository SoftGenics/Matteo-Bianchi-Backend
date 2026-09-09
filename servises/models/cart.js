// const {database} = require("../connection/database");
// const { Sequelize, DataTypes } = require('sequelize');
// const registration = require('./registration');
// const products = require('./product');

// const cartItem = database.define('cartItem', {
//     cart_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: registration,
//             key: 'id'
//         }
//     },
//     product_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: products,
//             key: 'product_id'
//         }
//     },
//     quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 1
//     }

// },
//     {
//         freezeTableName: true,
//         timestamps: true,

//     }
// )
// module.exports = cartItem;

// Products.hasMany(Cart)
// registration.hasMany(Cart)
// // Cart.belongsTo(Products)
// Cart.belongsTo(registration)

// Cart.belongsTo(Products, { foreignKey: 'product_id' });


const { DataTypes } = require("sequelize");
const { database } = require("../connection/database");

const Cart = database.define("Cart", {
    cart_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    mobile_num: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    main_category: {
        type: DataTypes.STRING,
        allowNull: true
    },

    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    Image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    prescription: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Eyewear prescription fields
    lens_type: {
        type: DataTypes.STRING,
        allowNull: true
    },

    lens_name: {
        type: DataTypes.STRING,
        allowNull: true
    },

    add: {
        type: DataTypes.STRING,
        allowNull: true
    },

    axis: {
        type: DataTypes.STRING,
        allowNull: true
    },

    left_cyl: {
        type: DataTypes.STRING,
        allowNull: true
    },

    left_sph: {
        type: DataTypes.STRING,
        allowNull: true
    },

    right_cyl: {
        type: DataTypes.STRING,
        allowNull: true
    },

    right_sph: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Cart;