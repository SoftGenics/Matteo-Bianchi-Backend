const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const jewelleryDetails = database.define("jewelleryDetails", {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    main_category: {
        type: DataTypes.STRING,
        allowNull: false
      },      
    sub_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_variant: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discount_percent: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false
    },
    thumbnail_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    video_url: {
        type: DataTypes.STRING
    },
    video_thumbnail_url: {
        type: DataTypes.STRING
    },
    stock_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT
    },
    total_reviews: {
        type: DataTypes.INTEGER
    },


    material_type: {
        type: DataTypes.STRING
    },
    stone_type: {
        type: DataTypes.STRING
    },
    weight: {
        type: DataTypes.STRING
    },
    same_color_type: {
        type: DataTypes.STRING
    }
});

module.exports = jewelleryDetails;
