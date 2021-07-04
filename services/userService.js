const { UserGroup } = require('../models/userGroup');

const addUsersToGroup = (user_id, group_id) => UserGroup.create(user_id, group_id);

module.exports = {
    addUsersToGroup
};
