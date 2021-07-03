const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { users } = require('./users');
const { validateUser } = require('./validators');

app.use(express.json());

router.use('/users', (req, res, next) => {
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
    .get((req, res) => {
        const filteredUsers = users.filter(user => !user.isDeleted);
        res.json(filteredUsers);
    })
    .post((req, res) => {
        const { login, password, age } = req.body;
        const userInfo = {
            id: uuidv4(),
            login,
            password,
            age,
            isDeleted: false
        };
        users.push(userInfo);
        res.json({
            success: true,
            message: 'New user was added'
        });
    });

router.route('/users/:id')
    .get((req, res) => {
        const user = users.find(u => u.id === req.params.id);
        res.json(user);
    })
    .put((req, res) => {
        const { login, password, age } = req.body;
        const currentUser = users.find(user => user.id === req.params.id);
        currentUser.login = login;
        currentUser.password = password;
        currentUser.age = age;
        res.json({
            success: true,
            message: 'User was updated'
        });
    })
    .delete((req, res) => {
        const deletedUser = users.find(user => user.id === req.params.id);
        deletedUser.isDeleted = !deletedUser.isDeleted;
        res.json({
            success: true,
            message: 'User was deleted'
        });
    });

app.use('/', router);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
