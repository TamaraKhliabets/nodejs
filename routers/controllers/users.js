const { User } = require('../../models/user');
const { UserGroup } = require('../../models/userGroup');

const getAllUsers = async () => await User.findAll({ where: { isdeleted: false } });

const createUser = async obj => await User.create(obj);

const getUserById = async id => await User.findAll({ where: { id } });

const updateUser = async (newDetails, id) => await User.update(newDetails, { where: { id } });

const deleteUser = async id => {
    await User.update({ isdeleted: true }, { where: { id } });
    await UserGroup.destroy({ where: { user_id: id } });
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
