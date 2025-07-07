const { Sequelize, DataTypes } = require('sequelize');
const {database} = require("../connection/database"); // Import your Sequelize instance

const item = database.define('item', {
    subCetegories_name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    item_name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    item_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
})
module.exports = item;