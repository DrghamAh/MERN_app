const Joi = require('joi');
const Category = require('../models/Category');

var categories;
Category.find().select('_id').then(response => {
  categories = response;
});


module.exports.ProductSchema = Joi.object().keys({
  name : Joi.string().required(),
  price : Joi.number().required(),
  quantity : Joi.number().required(),
  rating : Joi.number().required().default(0.0),
  category_id : Joi.string().required(),
});

module.exports.checkCategory = (id) => {
  const result = Category.countDocuments({_id : id});
  if (result) {
    return true;
  } else return false;
}
