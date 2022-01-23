const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Category = require('../models/Category');
const CategorySchema = require('../validation/CategoryValidation');

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
  const {error, value} = CategorySchema.validate({
    name : req.body.name,
  });

  if (!error) {
    const category = new Category({
      name : value.name,
    });
    category.save().then((response) => {
      res.status(501).json({data : response});
    }).catch(err => {
      res.status(400).json({err : err});
    });
  } else {
    res.json(error.details);
  }

}

/**
 * @method GET
 * @description method to get a single category
 * 
 * @param {id} req
 * @param res
 */
exports.show = (req, res) => {
  Category.findById(req.params.id).then(respone => {
    res.json(respone);
  }).catch(err => {
    res.status(500).json({err : err});
  })
}

/**
 * @method PUT
 * @description method to update category
 * @param {id, body} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
  const {error, value} = CategorySchema.validate({
    name : req.body.name,
  })

  if (!error) {
    Category.findByIdAndUpdate(req.params.id, {
      name : value.name,
    }, (err, doc, result) => {
      if (err) res.json(err);
      res.json(result);
    });
  } else {
    res.json(error.details);
  }
}

/**
 * @method GET 
 * @description method to delete category
 * 
 * @param id 
 */
exports.destroy = (req, res) => {
  Category.findByIdAndDelete(req.body.id, (err, doc, result) => {
    if (err) res.json(err);
    res.json(result);
  });
}