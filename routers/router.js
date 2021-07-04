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

const pathUsers = {
    getUsers: async (req, res) => {
        await sequelize.sync();
        const filteredUsers = await getAllUsers();
        res.json(filteredUsers);
    },
    createUser: async (req, res) => {
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
    }
};

const pathUser = {
    getUserById: async (req, res) => {
        await sequelize.sync();
        const user = await getUserById(req.params.id);
        res.json(user);
    },
    updateUser: async (req, res) => {
        const { id, login, password, age } = req.body;
        const newDetails = { id, login, password, age };
        await updateUser(clean(newDetails), req.params.id);
        res.json({
            success: true,
            message: 'User was updated'
        });
    },
    deleteUser: async (req, res) => {
        await deleteUser(req.params.id);
        res.json({
            success: true,
            message: 'User was deleted'
        });
    }
};

const pathGroups = {
    getGroups: async (req, res) => {
        await sequelize.sync();
        const groups = await getAllGroups();
        res.json(groups);
    },
    createGroup: async (req, res) => {
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
    }
};

const pathGroup = {
    getGroupById: async (req, res) => {
        await sequelize.sync();
        const group = await getGroupById(req.params.id);
        res.json(group);
    },
    updateGroup: async (req, res) => {
        const { name } = req.body;
        const newDetails = { name };
        await updateGroup(clean(newDetails), req.params.id);
        res.json({
            success: true,
            message: 'Group was updated'
        });
    },
    deleteGroup: async (req, res) => {
        await deleteGroup(req.params.id);
        res.json({
            success: true,
            message: 'User was deleted'
        });
    }
};

module.exports = {
    pathUsers,
    pathUser,
    pathGroups,
    pathGroup
};
