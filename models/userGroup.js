const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../data-access/constants');
const sequelize = new Sequelize(db);

const UserGroup = sequelize.define('userGroup', {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    group_id: {
        type: DataTypes.STRING,
        primaryKey: true
    }
}, {
    timestamps: false
});

module.exports = {
    UserGroup
};
