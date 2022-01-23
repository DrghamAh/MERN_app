const Joi = require('joi');

const OrderSchema = Joi.object().keys({
  product_id : Joi.string().required(),
  user_id : Joi.string().required(),
  price : Joi.number().required(),
  quantity : Joi.number().required().default(1),
});

module.exports = OrderSchema;