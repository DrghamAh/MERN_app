const User = require("../models/User");
const { RegisterSchema, LoginSchema } = require("../validation/UserValidation");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = require("../utils/generateToken");
const asyncHandler = require('express-async-handler');

exports.register = async (req, res) => {
  try {
    const {error, value} = RegisterSchema.validate({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      phone : req.body.phone,
    }, {abortEarly : false})

    if (!error) {
      const isExist = await User.findOne({email : req.email});

      if (isExist) {
        res.status(400).json({error : 'Email is already exist'});
      }

      const response = await User.create({
        name : value.name,
        email : value.email,
        phone : value.phone,
        password : bcrypt.hashSync(String(value.password)),
        role : 2,
      })

      if (response) {
        res.status(201).json({
          token : generateToken(response.data),
        });
      } else {
        res.status(501).json({error : 'Something Went wrong'});
      }
    } else {
      res.status(400).json(error.details);
    }
    
  } catch (error) {
    res.status(400).json(error);
  }
}

exports.login = asyncHandler(async (req, res) => {
  const {error, value} = LoginSchema.validate({
    email : req.body.email,
    password : req.body.password,
  }, {abortEarly : false});

  if (!error) {
    try {
      const response = await User.findOne({email : value.email});
      if (!response) {
        res.status(400).json({error : 'User Email does not exist'});
      } else {
        if (bcrypt.compareSync(value.password, response.data.password)) {
          res.status(400).json({password : 'Password Does not match'});
        } else {
          res.status(200).json({
            token : generateToken(response, 'adminsecretkey'),
          });
        }
      }
      
    } catch (err) {
      res.status(501).send(err);
    }

  } else {
    res.status(400).json(error);
  }
})