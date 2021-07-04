const jwt = require('jsonwebtoken');
const { secretKey } = require('../data-access/constants');
const { UserGroup } = require('../models/userGroup');

const addUsersToGroup = (user_id, group_id) => UserGroup.create(user_id, group_id);

const login = (username, password) => {
    const token = jwt.sign(
        { username, password },
        process.env.SECRET_KEY || secretKey,
        { algorithm: 'RS256' }
    );
    return token;
};

const verifyToken = (req, res) => {
    const url = req.url.substring(1);
    if (url === 'login') return;
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ auth: false, message: 'Unauthorized error' });
    jwt.verify(token, process.env.secretKey || secretKey, (err, decoded) => {
        if (err) return res.status(403).send({ auth: false, message: 'Forbidden error' });
        res.status(200).send(decoded);
    });
};

module.exports = {
    addUsersToGroup,
    login,
    verifyToken
};
