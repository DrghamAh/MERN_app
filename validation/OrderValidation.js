const Joi = require('joi');

const OrderSchema = Joi.object().keys({
  product_id : Joi.string().required(),
  user_id : Joi.string().required(),
  quantity : Joi.number().required().default(1),
  subtotal : Joi.number().required().default(0),
});

module.exports = OrderSchema;