const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Category = require('../models/Category');
const CategorySchema = require('../validation/CategoryValidation');


/**
 * @method GET
 * 
 * @description Method to return all categories
 * 
 * @param req 
 * @param res
 */
exports.index = async (req, res) => {
  try {
    const response = await Category.find();
    res.status(201).json(response);
  } catch (error) {
    res.status(501).json(error);
  }
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
      res.status(201).json({data : response});
    }).catch(err => {
      res.status(501).json({err : err});
    });
  } else {
    res.status(501).json(error.details);
  }

}

/**
 * @method GET
 * @description method to get a single category
 * 
 * @param {id} req
 * @param res
 */
exports.show = async (req, res) => {
  try {
    const response = await Category.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(501).json({err : error});
  }
}

/**
 * @method PUT
 * @description method to update category
 * @param {id, body} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
  const {error, value} = CategorySchema.validate({
    name : req.body.name,
  })

  if (!error) {
    try {
      const response = await Category.findByIdAndUpdate(req.params.id, {
        name : value.name,
      });
      res.status(201).json(response);
    } catch (err) {
      res.status(501).json(err);
    }
  } else {
    res.status(400).json(error.details);
  }
}

/**
 * @method GET 
 * @description method to delete category
 * 
 * @param id 
 */
exports.destroy = async (req, res) => {
  try {
    const response = await Category.findByIdAndDelete(req.body.id);
    res.status(202).json(response)
  } catch (error) {
    res.status(501).json(error)
  }
}