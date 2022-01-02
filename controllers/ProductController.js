const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Product = require('../models/Product');

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
  var product = new Product({
    name : req.body.name,
    price : req.body.price,
    quantity : req.body.quantity,
  })
  product.save().then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err);
  });
}

/**
 * @method GET
 * 
 * @param {id} req 
 * @param {BigInteger} res 
 */
exports.show = (req, res) => {
  Product.findById(req.body.id).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
}

/**
 * @method POST
 * 
 * @param {body, id} req
 * @param {} res
 */
exports.update = (req, res) => {
  Product.findByIdAndDelete(req.query.id).then(resurt => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
}

/**
 * @method POST
 * 
 * @param integer id
 */
exports.destroy = (req, res) => {
  Product.findByIdAndDelete(req.query.id, (err, doc, result) => {
    if (err) res.json(err);
    res.json(result);
  })
}