const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../data-access/constants');
const sequelize = new Sequelize(db);

const Group = sequelize.define('group', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        primaryKey: true
    }
}, {
    timestamps: false
});

module.exports = {
    Group
};
