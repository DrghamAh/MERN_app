const express = require('express');
const {index, create} = require('../controllers/ImageController');
const multer = require('multer');

const ImageRouter = express.Router();

const upload = multer({dest : '../client/public/uploads'});

ImageRouter.get('/images', index);
ImageRouter.post('/images', upload.single('image'), create);

module.exports = ImageRouter;