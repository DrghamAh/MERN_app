const Joi = require('joi');
const User = require('../models/User');
const UserSchema = require('../validation/UserValidation');

/**
 * Method to get all the users
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
 * Method to get single user
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
 * Method to create new user
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
  });

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
 * Method to update single user
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

module.exports.destroy = async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id);
    res.status(202).json(response);
  } catch (error) {
    res.status(501).json(error);
  }
}