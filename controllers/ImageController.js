const multer = require('multer');
const Image = require('../models/Image');

exports.index = (req, res) => {
  try {
    const response = Image.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(501).json(error);
  }
}

exports.create = (req, res) => {
  if (!req.file) {
    res.status(501).json('there is no image');
  }
  res.status(200).json({name : req.file});
}