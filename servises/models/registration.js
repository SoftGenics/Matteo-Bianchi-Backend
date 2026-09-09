const { Sequelize, DataTypes } = require('sequelize');
const {database} = require("../connection/database"); // Import your Sequelize instance

const registration = database.define('registration', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'GUEST',
  },
  mobile_num: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email_id: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.DATE,
  },
});

registration.associate = (models) => {
  registration.hasMany(models.bargainAttempts, {
      foreignKey: "user_id",
      as: "bargainAttempts",
      onDelete: "CASCADE",
      hooks: true
  });
};

module.exports = registration;