const express = require('express');
const { index, create, destroy, show, update } = require('../controllers/ProductController.js');
const bodyParser = require('body-parser');
const multer = require('multer');
const randomstring = require('randomstring');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware.js');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

const storage = multer.diskStorage({
  destination : (req, file, callback) => {
    callback(null, '../client/public/uploads/products');
  },
  filename : (req, file, callback) => {
    const extention = file.mimetype.split(RegExp('/'))[1];
    callback(null, randomstring.generate(12) + Date.now() + '.' + extention);
  }
})

const upload = multer({storage : storage});

router.get('/products/', index);
router.get('/products/:id', urlencodedParser, show);
router.post('/products', isAdmin, upload.single('image'), create);
router.delete('/products/:id', isAdmin, urlencodedParser, destroy);
router.put('/products/:id', isAdmin, urlencodedParser, update);


module.exports = router;