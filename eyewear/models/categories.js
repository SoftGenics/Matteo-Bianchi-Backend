const { Sequelize, DataTypes } = require('sequelize');
const {database} = require("../connection/database"); // Import your Sequelize instance 

const cetegories = database.define('cetegories', {
    categories_name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
})
module.exports = cetegories;