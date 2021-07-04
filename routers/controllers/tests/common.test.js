const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../users');

const {
    getAllGroups,
    createGroup,
    getGroupById,
    updateGroup,
    deleteGroup
} = require('../groups');


const users = [{
    id: '1',
    login: 'login',
    password: 'password',
    age: 1,
    isdeleted: false
}];

const groups = [{
    id: '1',
    name: 'login',
    permission: 'READ'
}];

describe('user tests', () => {
    it('getAllUsers should return an array of users', () => {
        expect(getAllUsers()).toBeTruthy();
    });
    it('createUser should create single user', () => {
        const user = createUser(users[0]);
        expect(user).toBeTruthy();
    });
    it('getUserById should return single user', () => {
        const user = getUserById(users[0].id);
        expect(user).toBeTruthy();
    });
    it('updateUser should be invoked', () => {
        const newDetails = { age: 2 };
        const update = updateUser(newDetails, users[0].id);
        expect(update).toBeTruthy();
    });
    it('deleteUser should be invoked', () => {
        const deletedUser = deleteUser(users[0].id);
        expect(deletedUser).toBeTruthy();
    });
});

describe('groups tests', () => {
    it('getAllGroups should return an array of groups', () => {
        expect(getAllGroups()).toBeTruthy();
    });
    it('createGroup should create single group', () => {
        const createdGroup = createGroup(groups[0]);
        expect(createdGroup).toBeTruthy();
    });
    it('getGroupById should return single user', () => {
        const group = getGroupById(groups[0].id);
        expect(group).toBeTruthy();
    });
    it('updateGroup should be invoked', () => {
        const newDetails = { name: 'name' };
        const updatedGroup = updateGroup(newDetails, groups[0].id);
        expect(updatedGroup).toBeTruthy();
    });
    it('deleteGroup should be invoked', () => {
        const deletedGroup = deleteGroup(groups[0].id);
        expect(deletedGroup).toBeTruthy();
    });
});
