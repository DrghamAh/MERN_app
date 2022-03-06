const express = require('express');
const {index, create} = require('../controllers/ImageController');
const multer = require('multer');
const randomstring = require('randomstring');

const ImageRouter = express.Router();

const storage = multer.diskStorage({
  destination : (req, file, callback) => {
    callback(null, '../client/public/uploads');
  },
  filename : (req, file, callback) => {
    const name = randomstring.generate(12) + Date.now() + '.' + file.mimetype.split('/')[1];
    callback(null, name);
  }
});

const name = 'a-b-c';
name.split('-')

const upload = multer({storage : storage});

ImageRouter.get('/images', index);
ImageRouter.post('/images', upload.single('image'), create);

module.exports = ImageRouter;