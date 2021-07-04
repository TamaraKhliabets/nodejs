const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require('sequelize');
const { db } = require('../data-access/constants');
const sequelize = new Sequelize(db);
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('./controllers/users');
const {
    getAllGroups,
    createGroup,
    getGroupById,
    updateGroup,
    deleteGroup
} = require('./controllers/groups');
const { clean, permissions } = require('../utils');
const { errorLogger } = require('../logger');

const pathUsers = {
    getUsers: async (req, res) => {
        try {
            await sequelize.sync();
            const filteredUsers = await getAllUsers();
            res.json(filteredUsers);
        } catch (err) {
            errorLogger(err, req, res);
        }
    },
    createUser: async (req, res) => {
        try {
            const { login, password, age } = req.body;
            const id = uuidv4();
            await sequelize.sync();
            const userInfo = {
                id,
                password,
                login,
                age,
                isdeleted: false
            };
            const newUser = await createUser(userInfo);
            res.json({
                success: true,
                message: `New user ${newUser.login} was added`
            });
        } catch (err) {
            errorLogger(err, req, res);
        }
    }
};

const pathUser = {
    getUserById: async (req, res) => {
        try {
            await sequelize.sync();
            const user = await getUserById(req.params.id);
            res.json(user);
        } catch (err) {
            errorLogger(err, req, res);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id, login, password, age } = req.body;
            const newDetails = { id, login, password, age };
            await updateUser(clean(newDetails), req.params.id);
            res.json({
                success: true,
                message: 'User was updated'
            });
        } catch (err) {
            errorLogger(err, req, res);
        }
    },
    deleteUser: async (req, res) => {
        try {
            await deleteUser(req.params.id);
            res.json({
                success: true,
                message: 'User was deleted'
            });
        } catch (err) {
            errorLogger(err, req, res);
        }
    }
};

const pathGroups = {
    getGroups: async (req, res) => {
        try {
            await sequelize.sync();
            const groups = await getAllGroups();
            res.json(groups);
        } catch (err) {
            errorLogger(err, req, res);
        }
    },
    createGroup: async (req, res) => {
        try {
            await sequelize.sync();
            const { name } = req.body;
            console.log(name);
            const id = uuidv4();
            await sequelize.sync();
            const groupInfo = {
                id,
                name,
                permissions
            };
            const newGroup = await createGroup(groupInfo);
            res.json({
                success: true,
                message: `New user ${newGroup.name} was added`
            });
        } catch (err) {
            errorLogger(err, req, res);
        }
    }
};

const pathGroup = {
    getGroupById: async (req, res) => {
        try {
            await sequelize.sync();
            const group = await getGroupById(req.params.id);
            res.json(group);
        } catch (err) {
            errorLogger(err, req, res);
        }
    },
    updateGroup: async (req, res) => {
        try {
            const { name } = req.body;
            const newDetails = { name };
            await updateGroup(clean(newDetails), req.params.id);
            res.json({
                success: true,
                message: 'Group was updated'
            });
        } catch (err) {
            errorLogger(err, req, res);
        }
    },
    deleteGroup: async (req, res) => {
        try {
            await deleteGroup(req.params.id);
            res.json({
                success: true,
                message: 'User was deleted'
            });
        } catch (err) {
            errorLogger(err, req, res);
        }
    }
};

module.exports = {
    pathUsers,
    pathUser,
    pathGroups,
    pathGroup
};
