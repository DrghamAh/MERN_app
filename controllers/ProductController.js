const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Product = require('../models/Product');
const ProductSchema = require('../validation/ProductValidation');
const Category = require('../models/Category');

var urlencodedParser = bodyParser.urlencoded({ extended: false });


exports.index = (req, res) => {
  Product.find().then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
}

/**
 * @method POST
 * 
 * @param {Body} req 
 * @param {} res 
 */
exports.create = (req, res) => {
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
    product.save().then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    });
  } else {
    res.json(error.details);
  }
}

/**
 * @method GET
 * 
 * @param {id} req 
 * @param {BigInteger} res 
 */
exports.show = (req, res) => {
  Product.findById(req.params.id).then(response => {
    res.json(response);
  }).catch(err => {
    res.json(500, {err : err});
  });
}

/**
 * @method POST
 * 
 * @param {body, id} req
 * @param {} res
 */
exports.update = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, {
    name : req.body.name,
    price : req.body.price,
    quantity : req.body.quantity,
    category_id : req.body.category_id,
  }, (err, doc, result) => {
    if (err) res.json(err);
    res.json(result);
  });
}

/**
 * @method POST
 * 
 * @param integer id
 */
exports.destroy = (req, res) => {
  Product.findByIdAndDelete(req.body.id, (err, doc, result) => {
    if (err) res.json(err);
    res.json(result);
  })
}