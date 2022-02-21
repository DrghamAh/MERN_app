const Joi = require('joi');

const RatingSchema = Joi.object().keys({
  user_id : Joi.string().required(),
  product_id : Joi.string().required(),
  rate : Joi.number().required().default(0.0).min(0.0).max(5.0),
}, {abortEarly : false});

module.exports = RatingSchema;