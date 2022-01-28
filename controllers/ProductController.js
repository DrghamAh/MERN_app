const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Product = require('../models/Product');
const ProductSchema = require('../validation/ProductValidation');
const Category = require('../models/Category');

exports.index = async (req, res) => {
  try {
    const response = await Product.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(501).json(err);
  }
}

/**
 * @method POST
 * 
 * @param {Body} req 
 * @param {} res 
 */
exports.create = async (req, res) => {
  const {error, value} = ProductSchema.validate({
    name : req.body.name,
    price : req.body.price,
    quantity : req.body.quantity,
    category_id : req.body.category_id,
  });

  if (!error) {
    var product = new Product({
      name : value.name,
      price : value.price,
      quantity : value.quantity,
      category_id : value.category_id
    });
    try {
      const response = await product.save();
      res.status(201).json(response)
    } catch (err) {
      res.status(501).json(err)
    }
  } else {
    res.status(400).json(error.details);
  }
}

/**
 * @method GET
 * 
 * @param {id} req 
 * @param {BigInteger} res 
 */
exports.show = async (req, res) => {
  try {
    const response = await Product.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.json(501, {err : err});
  }
}

/**
 * @method POST
 * 
 * @param {body, id} req
 * @param {} res
 */
exports.update = async (req, res) => {
  const {error, value} = ProductSchema.validate({
    name : req.body.name,
    price : req.body.price,
    quantity : req.body.quantity,
    category_id : req.body.category_id,
  });

  if (!error) {

    try {
      const response = await Product.findByIdAndUpdate(req.params.id, {
        name : value.name,
        price : value.price,
        quantity : value.quantity,
        category_id : value.category_id,
      });
      res.status(201).json(response);
    } catch (err) {
      res.status(501).json(err);
    }
  } else {
    res.status(400).json(error);
  }
}

/**
 * @method DELETE
 * 
 * @param integer id
 */
exports.destroy = async (req, res) => {
  try {
    const response = await Product.findByIdAndDelete(req.body.id);
    res.status(201).json(response);
  } catch (error) {
    res.status(501).json(error);
  }
}