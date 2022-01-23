const Joi = require('joi');
const Category = require('../models/Category');

var categories;
Category.find().select('_id').then(response => {
  categories = response;
});


const ProductSchema = Joi.object().keys({
  name : Joi.string().required(),
  price : Joi.number().required(),
  quantity : Joi.number().required(),
  category_id : Joi.string().required(),
});

module.exports = ProductSchema;