const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const router = express.Router();
const { validate } = require('./validators');
const {
    pathUsers: {
        getUsers,
        createUser
    },
    pathUser: {
        getUserById,
        updateUser,
        deleteUser
    },
    pathGroups: {
        getGroups,
        createGroup
    },
    pathGroup: {
        getGroupById,
        updateGroup,
        deleteGroup
    }
} = require('./routers/router');
const { logger, errorHandler } = require('./logger');
const { verifyToken } = require('./services/userService');

app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use(verifyToken);
app.use(cors());

router
    .use('/users', (req, res, next) => validate(req, res, next, 'user'))
    .use('/groups', (req, res, next) => validate(req, res, next, 'group'))
    .use('/login', (req, res, next) => validate(req, res, next, 'login'));

router.route('/users')
    .get((req, res) => getUsers(req, res))
    .post((req, res) => createUser(req, res));

router.route('/users/:id')
    .get((req, res) => getUserById(req, res))
    .put((req, res) => updateUser(req, res))
    .delete((req, res) => deleteUser(req, res));

router.route('/groups')
    .get((req, res) => getGroups(req, res))
    .post((req, res) => createGroup(req, res));

router.route('/groups/:id')
    .get((req, res) => getGroupById(req, res))
    .put((req, res) => updateGroup(req, res))
    .delete((req, res) => deleteGroup(req, res));

router.route('/login')
    .post(() => console.log('for future'));

app.use('/', router);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
