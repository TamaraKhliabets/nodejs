const Joi = require('joi');

const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]*$')).required(),
    age: Joi.number().integer().min(4).max(140).required()
});

const groupSchema = Joi.object({
    name: Joi.string().required()
});

const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]*$')).required()
});

const validateUser = obj => userSchema.validate(obj);

const validateGroup = obj => groupSchema.validate(obj);

const validateLogin = obj => loginSchema.validate(obj);

const getValidator = schemaName => {
    switch (schemaName) {
        case 'user':
            return validateUser;
        case 'group':
            return validateGroup;
        case 'login':
            return validateLogin;
        default:
            return;
    }
};

const validate = (res, req, next, schemaName) => {
    if (req && req.body) return next();
    const validator = getValidator(schemaName);
    const { error } = validator(req.body);
    if (error) {
        const message = {
            status: 400,
            message: `Validation error with ${error.message.split(' ')[0]}`
        };
        return next(res.status(400).send(message));
    }
    next();
};


module.exports = {
    validate
};
