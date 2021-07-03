const users = require('./users');

const getAutoSuggestUsers = (loginSubstring, limit) => {
    const re = new RegExp(`^${loginSubstring}`);
    return users.filter(user => user.login.match(re)).slice(limit).map(el => el.login);
};

module.exports = {
    getAutoSuggestUsers
};
