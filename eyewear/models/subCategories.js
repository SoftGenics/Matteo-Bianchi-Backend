const { Sequelize, DataTypes } = require('sequelize');
const {database} = require("../connection/database"); // Import your Sequelize instance

const subCetegories = database.define('subCetegories', {
    categories_name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    subCetegories_name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    subCetegories_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
})
module.exports = subCetegories;