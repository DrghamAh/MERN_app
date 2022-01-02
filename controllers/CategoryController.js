const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Category = require('../models/Category');

var urlencodedParser = bodyParser.urlencoded({ extended: false })



/**
 * @method GET
 * 
 * @description Method to return all categories
 * 
 * @param req 
 * @param res
 */
exports.index = (req, res) => {
  Category.find().then(response => {
    res.json(response);
  }).catch(err => {
    res.json(err);
  });
}

/**
 * @method POST
 * 
 * @description method to add new category
 * @param req
 * @param res
 */
exports.create = (req, res) => {
  Category = new Category({
    name : req.body.name,
  });
  Category.save().then((response) => {
    res.json(response);
  }).catch(err => {
    res.json(err);
  });

}

/**
 * @method GET
 * @description method to get a single category
 * 
 * @param {id} req
 * @param res
 */
exports.show = (req, res) => {
  Category.findById(req.params.id).then(result => {
    res.json(response);
  }).catch(err => {
    res.json(err);
  });
}

/**
 * @method POST
 * @description method to update category
 * @param {id, body} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
  Category.findByIdAndUpdate(req.query.id, {
    name : req.body.name
  }, (err, doc, result) => {
    if (err) res.json(err);
    res.json(result);
  });
}

/**
 * @method GET 
 * @description method to delete category
 * 
 * @param id 
 */
exports.destroy = (req, res) => {
  Category.findByIdAndDelete(req.query.id, (err, doc, result) => {
    if (err) res.json(err);
    res.json(result);
  });
}