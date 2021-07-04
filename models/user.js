const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../data-access/constants');
const sequelize = new Sequelize(db);

const User = sequelize.define('user', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    age: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        primaryKey: true
    }
}, {
    timestamps: false
});

module.exports = {
    User
};
