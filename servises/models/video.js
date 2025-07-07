const { database } = require("../connection/database"); // Import your Sequelize instance
const { DataTypes, Sequelize } = require('sequelize');
// const product = require('./product');
// const videothumnail = require('./videothumnail');

const video = database.define('video', {
  video_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  like: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  shared: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  video_type: {
    type: DataTypes.STRING,
    allowNull: true

  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Videothumnail_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: videothumnail,
  //     key: 'Videothumnail_id'
  //   }
  // }
})

// Videothumnail.belongsTo(Video, { foreignKey: 'video_id' });

module.exports = video;

// videothumnail.hasMany(video, { foreignKey: 'Videothumnail_id' })
// video.hasMany(videothumnail, { foreignKey: 'Videothumnail_id' })