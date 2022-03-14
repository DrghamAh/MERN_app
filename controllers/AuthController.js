const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const register = asyncHandler(async (req, res) => {
  const {name, email, password, phone} = req.body;
  
  const isExist = await User.findOne({email : email});

  if (isExist) {
    res.status(400).json({error : 'user is alredy exist'});
  }

  const response = await User.create({
    name : name,
    email : email,
    password : bcrypt.hashSync(String(password)),
    phone : phone,
    role : 1,
  })

  if (response) {

    res.status(201).json({  
      token : generateToken({
        _id : response._id,
        name : response.name,
        email : response.email,
        phone : response.phone,
        role : response.role,
        favorites : response.favorites,
      }, 'usersecretkey'),
    });
  } else {
    res.status(501).json({error : 'Something went wrong'});
  }
});

const login = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email : email});

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        token : generateToken({
          _id : user._id,
          name : user.name,
          email : user.email,
          phone : user.phone,
          role : user.role,
          favorites : user.favorites
        }, 'usersecretkey'),
      });
    } else {
      res.status(400).json({
        email : '',
        password : 'password does not match',
      })
    }

  } else {
    res.status(404).json({
      email : 'Email does not exist',
      password : '',
    })
  }
})

module.exports = { register, login };
