const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const UserSchema = require('../validation/UserValidation');


/**
 * @description Method to get all the users
 * @method GET
 */
module.exports.index = async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @description Method to get single user
 * @method GET
 * 
 * @param {params, id} req 
 * @param {*} res 
 */
module.exports.show = async (req, res) => {
  try {
    const response = await User.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @description Method to create new user
 * @method POST
 * 
 * @param {body} req 
 * @param {*} res 
 */
module.exports.create = async (req, res) => {
  const {error, value} = UserSchema.validate({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    phone : req.body.phone,
  }, {abortEarly : false});

  if (!error) {
    try {
      const response = await User.create({
        name : value.name,
        email : value.email,
        password : value.password,
        phone : value.phone,
      })
      res.status(201).json(response)
    } catch (err) {
      res.status(501).json(err);
    }
  } else {
    res.status(400).json(error);
  }

}

/**
 * @description Method to update single user
 * @method PUT
 * 
 * @param {id, body} req 
 * @param {*} res 
 */
module.exports.update = async (req, res) => {
  const {error, value} = UserSchema.validate({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    phone : req.body.phone,
  });

  if (!error) {
    try {
      const response = await User.findByIdAndUpdate(req.params.id, {
        name : value.name,
        email : value.email,
        password : value.password,
        phone : value.phone,
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
 * @description Method to delete user
 * @method DELETE
 *  
 * @param {*} req 
 * @param {*} res 
 */
module.exports.destroy = async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id);
    res.status(202).json(response);
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method GET
 * @description Method to get all user favorite Products
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.favorites = async (req, res) => {
  try {
    const response = await User.findById(req.params.id);
    if (response) {
      res.status(200).json(response.favorites);
    } else {
      res.status(400).json({error : "Something went wrong"});
    }
  } catch (error) {
    res.status(501).json(error)
  }
}

/**
 * @method POST
 * @description Method to add Favorite product to the user
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.favorites.push(req.body.product_id);
    const result = user.save();

    if (result) {
      res.status(201).json(result);
    } else {
      res.status(400).json({error : 'Something went wrong'});
    }
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @method DELETE
 * @description Method to delete Favorite Product
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.deleteFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const response = await User.findByIdAndUpdate(req.params.id, {
        favorites : user.favorites.filter(({product_id}) => product_id === req.params.product_id),
      });

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(400).json({error : 'Something went wrong'});
      }
    } else {
      res.status(400).json({error : "User may not exist"});
    }
  } catch (error) {
    res.status(501).json(error);
  }
}

