const Joi = require('joi');

const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]*$')).required(),
    age: Joi.number().integer().min(4).max(140).required()
});

const groupSchema = Joi.object({
    name: Joi.string().required()
});

const validateUser = user => userSchema.validate(user);

const validateGroup = group => groupSchema.validate(group);

const getValidator = schemaName => {
    switch (schemaName) {
        case 'user':
            return validateUser;
        case 'group':
            return validateGroup;
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
