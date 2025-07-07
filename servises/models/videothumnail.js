// const { database } = require("../connection/database"); // Import your Sequelize instance
// const { DataTypes ,Sequelize,BelongsTo} = require('sequelize');

// const videothumnail = database.define('Videothumnail', {
//   Videothumnail_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   thumbnail_url:{
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = videothumnail

// Videothumnail.hasMany(Video,{foreignKey:'Videothumnail_id'})
// Videothumnail.belongsTo(Video,{foreignKey:'video_id'})