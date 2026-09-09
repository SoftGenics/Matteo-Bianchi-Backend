const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const productLink = database.define("productLink", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    main_category: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: "product_links",
        timestamps: true,
    }
);

module.exports = productLink;