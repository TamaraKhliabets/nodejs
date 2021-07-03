const Joi = require('joi');

const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]*$')).required(),
    age: Joi.number().integer().min(4).max(140).required()
});

const validateUser = user => schema.validate(user);

module.exports = {
    validateUser
};
