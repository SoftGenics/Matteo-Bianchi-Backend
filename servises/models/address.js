const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../connection/database");

const registration = require('./registration');


const address = database.define('address', {
    addresses_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },  
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },  
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false

    },
    house_flat_office_no: {
        type: DataTypes.STRING,
        allowNull: false

    },
    address: {
        type: DataTypes.STRING,
        allowNull: false

    },
    landmark: {
        type: DataTypes.STRING,
        allowNull: true

    },
    contact_name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    mobile_num: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    address_type: {
        type: DataTypes.STRING,
        allowNull: false

    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: registration,
            key: 'user_id'
        }
    },
},
    {
        freezeTableName: true,
        timestamps: true,
    }
)

module.exports = address;
// registration.hasMany(Address, { foreignKey: 'user_id' });
address.belongsTo(registration, { foreignKey: 'user_id' });