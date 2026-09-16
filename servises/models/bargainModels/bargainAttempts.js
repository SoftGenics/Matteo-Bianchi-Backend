const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const bargainAttempts = database.define("BargainAttempts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "registrations",   // registration table 
        key: "user_id"
      },
      onDelete: "CASCADE"
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    main_category: {
      type: DataTypes.ENUM(
        "products",
        "footwear",
        "jewellery",
        "purse",
        "clothings",
        "eyewear"
      ),
      allowNull: false,
    },

    offer_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    result: {
      type: DataTypes.ENUM(
        "accepted",
        "counter",
        "rejected"
      ),
      allowNull: false,
    },

    attempt_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
);

bargainAttempts.associate = (models) => {

  bargainAttempts.belongsTo(models.registration, {
    foreignKey: "user_id",
    as: "user"
  });

};

module.exports = bargainAttempts;