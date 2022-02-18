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
    res.status(400).json({error : "you did not upload a file"});
  }
  
  try {
    const response = Image.create({
      name : req.body.name,
    });
    if (response) {
      res.status(201).json(response);
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    res.status(501).json(error);
  }
}