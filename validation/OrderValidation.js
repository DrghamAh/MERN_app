const Joi = require('joi');

const OrderSchema = Joi.object().keys({
  user_id : Joi.string().required(),
  data : Joi.array().required(),
});

const Product_OrderSchema = Joi.object().keys({
  product_id : Joi.string().required(),
  quantity : Joi.number().default(1),
})

module.exports = { OrderSchema, Product_OrderSchema };