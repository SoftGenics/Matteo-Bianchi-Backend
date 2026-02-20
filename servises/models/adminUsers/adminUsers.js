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
    verify_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    admin_status: {
        type: DataTypes.ENUM("pending", "approved"),
        allowNull: false,
        defaultValue: "approved" // 🔥 main line
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user" // main line
    },
})
module.exports = admin_users