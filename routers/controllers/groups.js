const { Group } = require('../../models/group');
const { UserGroup } = require('../../models/userGroup');

const getAllGroups = async () => await Group.findAll({});

const createGroup = async obj => await Group.create(obj);

const getGroupById = async id => await Group.findAll({ where: { id } });

const updateGroup = async (newDetails, id) => await Group.update(newDetails, { where: { id } });

const deleteGroup = async id => {
    await Group.destroy({ where: { id } });
    await UserGroup.destroy({ where: { group_id: id } });
};

module.exports = {
    getAllGroups,
    createGroup,
    getGroupById,
    updateGroup,
    deleteGroup
};
