const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../connection/database"); // Import your Sequelize instance


const products = database.define('products', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    product_categories: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    brand_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    brand_id: {
        type: DataTypes.INTEGER, // Update data type to match the primary key of the 'brand' table
        allowNull: true,
    },

    place: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    product_title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    product_price: {
        type: DataTypes.INTEGER,
        allowNull: true,

    },
    product_thumnail_img: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    product_ad: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    count_in_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,

    },
    offer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: true,

    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true,

    },
    ideal_for: {
        type: DataTypes.JSON, // Replace STRING with the appropriate data type for your array elements
        allowNull: true,
    },
    product_work_for: {
        type: DataTypes.JSON, // Replace STRING with the appropriate data type for your array elements
        allowNull: true,
    },
    highlights: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    product_expiry_date: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_all_img: {
        type: DataTypes.JSON,
        allowNull: true
    },
    frame_shape: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    frem_type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    frameDescription: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lensInformation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    frameMaterial: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    templeColor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    color: {
        type: DataTypes.JSON, // Replace STRING with the appropriate data type for your array elements
        allowNull: true,
    },
    frameColor: {
        type: DataTypes.STRING, // Replace STRING with the appropriate data type for your array elements
        allowNull: true,
    },
    lenshColor: {
        type: DataTypes.STRING, // Replace STRING with the appropriate data type for your array elements
        allowNull: true,
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    video_thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
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

    }
)

module.exports = products;

// Products.belongsTo(Brand,{foreignKey:'brand_id'})
