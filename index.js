const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const { validateUser } = require('./validators');
const {
    pathUsers: {
        getUsers,
        createUser
    },
    pathUser: {
        getUserById,
        updateUser,
        deleteUser
    }
} = require('./routers/router');

app.use(express.json());

router.use('/users', (req, res, next) => {
    if (req && req.body) return next();
    const { error } = validateUser(req.body);
    if (error) {
        const message = {
            status: 400,
            message: `Validation error with ${error.message.split(' ')[0]}`
        };
        return next(res.status(400).send(message));
    }
    next();
});

router.route('/users')
    .get((req, res) => getUsers(req, res))
    .post((req, res) => createUser(req, res));

router.route('/users/:id')
    .get((req, res) => getUserById(req, res))
    .put((req, res) => updateUser(req, res))
    .delete((req, res) => deleteUser(req, res));

app.use('/', router);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

module.exports = {
    router
};
