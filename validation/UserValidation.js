const Joi = require('joi');

const UserSchema = Joi.object().keys({
  name : Joi.string().required(),
  email : Joi.string().email().required(),
  password : Joi.string().min(8),
  phone : Joi.string().required(),
});

module.exports = UserSchema;