const Joi = require('joi');

const FavoriteSchema = Joi.object({
  user_id : Joi.string().required(),
  product_id : Joi.string().required(),
})

module.exports = FavoriteSchema;