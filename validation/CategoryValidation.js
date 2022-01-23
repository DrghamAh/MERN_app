const Joi = require('joi');

const CategorySchema = Joi.object().keys({
  name : Joi.string().required(),
});

module.exports = CategorySchema;