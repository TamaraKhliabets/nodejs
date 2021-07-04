const { URL, SECRET } = require('./env');
const db = URL;
const secret = SECRET;

module.exports = {
    db,
    secret
};
