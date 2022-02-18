const express = require('express');
const {index, create} = require('../controllers/ImageController');
const multer = require('multer');

const ImageRouter = express.Router();


const storage = multer.diskStorage({
  destination : (req, file, callBack) => {
    callBack(null, './public/images');
  },
  filename : (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now());
  }
})

const upload = multer({
  storage : storage,
});

ImageRouter.get('/images', index);
ImageRouter.post('/images', upload.single('image'), create);

module.exports = ImageRouter;