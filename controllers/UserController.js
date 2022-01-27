const Joi = require('joi');
const User = require('../models/User');
const UserSchema = require('../validation/UserValidation');

/**
 * Method to get all the users
 */
module.exports.index = (req, res) => {
  User.find().then(response => {
    res.status(501).json(response);
  }).catch(err => {
    res.state(200).json(err);
  });
}

/**
 * Method to get single user
 * 
 * @param {params, id} req 
 * @param {*} res 
 */
module.exports.show = (req, res) => {
  User.findById(req.params.id).then(response => {
    res.status(200).json(response);
  }).catch(err => {
    res.status(501).json(err);
  });
}

/**
 * Method to create new user
 * 
 * @param {body} req 
 * @param {*} res 
 */
module.exports.create = (req, res) => {
  const {error, value} = UserSchema.validate({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    phone : req.body.phone,
  });

  if (!error) {
    User.create({
      name : value.name,
      email : value.email,
      password : value.password,
      phone : value.phone,
    }).then(response => {
      res.status(201).json(response);
    }).catch(err => {
      res.status(501).json(err);
    });
    res.json(value)
  } else {
    res.status(501).json(error.details);
  }

}

/**
 * Method to update single user
 * 
 * @param {id, body} req 
 * @param {*} res 
 */
module.exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    phone : req.body.phone,
  }).then(response => {
    res.status(202).json(response);
  }).catch(err => {
    res.status(501).json(err);
  });
}

module.exports.destroy = (req, res) => {
  User.findByIdAndDelete(req.params.id).then(response => {
    res.status(202).json(response);
  }).catch(err => {
    res.status(501).json(err);
  });
}