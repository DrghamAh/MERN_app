const Joi = require('joi');

const RegisterSchema = Joi.object().keys({
  name : Joi.string().required(),
  email : Joi.string().email().required(),
  password : Joi.string().min(8),
  phone : Joi.string().required(),
});

const LoginSchema = Joi.object().keys({
  email : Joi.string().required(),
  password : Joi.string().min(8),
});

module.exports = {
  RegisterSchema,
  LoginSchema,
};