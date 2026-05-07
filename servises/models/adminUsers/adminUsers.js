const { DataTypes } = require("sequelize");
const { database } = require("../../connection/database")

const admin_users = database.define('admin_users', {
  admin_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  admin_status: {
    type: DataTypes.ENUM("Pending", "Approved"),
    allowNull: false,
    defaultValue: "Pending" // 🔥 main line
  },
  role: {
    type: DataTypes.ENUM("Admin", "Seller_Admin", "User"),
    allowNull: false,
    defaultValue: "User" // main line
  },
  permissions: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      eyewear: false,
      clothing: false,
      jewellery: false,
      footwear: false,
      bags: false
    }
  }
})

// 🔥 ASSOCIATIONS
admin_users.associate = (models) => {
  admin_users.hasMany(models.bagsDetails, {
    foreignKey: "admin_id",
    as: "bags",
    onDelete: "CASCADE",
    hooks: true // 🔥 ADD THIS
  });

  admin_users.hasMany(models.jewelleryDetails, {
    foreignKey: "admin_id",
    as: "jewellery",
    onDelete: "CASCADE",
    hooks: true // 🔥 ADD THIS
  });

  admin_users.hasMany(models.eyewearDetails, {
    foreignKey: "admin_id",
    as: "eyewear",
    onDelete: "CASCADE",
    hooks: true // 🔥 ADD THIS
  });

  admin_users.hasMany(models.footwearDetails, {
    foreignKey: "admin_id",
    as: "footwear",
    onDelete: "CASCADE",
    hooks: true // 🔥 ADD THIS
  });

  admin_users.hasMany(models.clothingDetails, {
    foreignKey: "admin_id",
    as: "clothing",
    onDelete: "CASCADE",
    hooks: true // 🔥 ADD THIS
  });
};

module.exports = admin_users