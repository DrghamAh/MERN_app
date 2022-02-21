const Rating = require('../models/Rating');
const User = require('../models/User');
const Product = require('../models/Product');
const RatingSchema = require('../validation/RatingValidation');

/**
 * @method GET
 * @description Method to get all rating
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.index = async (req, res) => {
  try {
    const response = await Rating.find();
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(501).json({error : 'Something went wrong'});
    }
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method GET
 * @description Method to get single rating 
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.show = async (req, res) => {
  try {
    const response = await Rating.findById(req.params.id);
    if (response) {
      res.status(200).json(response);
    }
    res.status(404).json({error : 'Not Found'});
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method POST
 * @description Method to add new rating
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.create = async (req, res) => {
  const {error, value} = RatingSchema.validate({
    user_id : req.body.user_id,
    product_id : req.body.product_id,
    rate : req.body.rate,
    message : req.body.message,
  });

  if (!error) {
    const user = User.findById(value.user_id);
    const product = Product.findById(value.product_id);

    if (!user && !product) {
      res.status(404).json({error : 'User or Product may not exist'});
    } else {
      try {
        const response = await Rating.create({
          user_id : req.body.user_id,
          product_id : req.body.product_id,
          rate : req.body.rate,
          message : req.body.message
        });
        if (response) {
          res.status(201).json(response);
        } else {
          res.status(501).json({error : 'Something Went Wrong'});
        }
      } catch (err) {
        res.status(501).json(err)
      }
    }
  } else {
    res.status(400).json(error);
  }

}

/**
 * @method PUT
 * @description Method to update rating info
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.update = async (req, res) => {
  const {error, value} = RatingSchema.validate({
    user_id : req.body.user_id,
    product_id : req.body.product_id,
    rate : req.body.rate,
  })

  if (!error) {
    const user = User.findById(value.user_id);
    const product = Product.findById(value.product_id);

    if (user && product) {
      res.status(404).json({error : 'User or Product may not exist'});
    } else {
      try {
        const response = await Rating.findByIdAndUpdate(req.params.id, {
          user_id : value.user_id,
          product_id : value.product_id,
          rate : value.rate,
        });
        if (response) {
          res.status(201).json(response);
        } else {
          res.status(400).json({error : 'Rating may not exist'});
        }
      } catch (error) {
        res.status(501).json(error);
      }
    }
  } else {
    res.status(400).json(error);
  }
}

/**
 * @method DELETE
 * @description Method to delete a rating
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.destroy = async (req, res) => {
  try {
    const response = await Rating.findByIdAndDelete(req.params.id);
    if (response) {
      res.status(202).json(response);
    } else {
      res.status(404).json({error : "Rating May not exist"});
    }
  } catch (error) {
    res.status(501).json(error);
  }
}
