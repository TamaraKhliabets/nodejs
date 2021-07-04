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
const { clean } = require('../utils');

const pathUsers = {
    getUsers: async (req, res) => {
        await sequelize.sync();
        const filteredUsers = await getAllUsers();
        res.json(filteredUsers);
    },
    createUser: async (req, res) => {
        const { login, password, age } = req.body;
        const id = uuidv4();
        // await sequelize.sync();
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

module.exports = {
    pathUsers,
    pathUser
};
