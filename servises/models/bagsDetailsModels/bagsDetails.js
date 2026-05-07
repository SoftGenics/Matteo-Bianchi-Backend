const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const bagsDetails = database.define("bagsDetails", {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // 🔥 FOREIGN KEY
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "admin_users", // table name EXACT hona chahiye
            key: "admin_id"
        },
        onDelete: "CASCADE"
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    size_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pattern_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    closure_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    same_color_type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// 🔥 ASSOCIATION
bagsDetails.associate = (models) => {
    bagsDetails.belongsTo(models.admin_users, {
        foreignKey: "admin_id",
        as: "admin",
        onDelete: "CASCADE",
        hooks: true // 🔥 IMPORTANT for cascade
    });
};


module.exports = bagsDetails;
