const express = require('express');
const { index, create, destroy, show, update } = require('../controllers/ProductController.js');
const bodyParser = require('body-parser');
const multer = require('multer');
// const isAuthenticated = require('../middlewares/authMiddleware.js');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

const upload = multer({dest : '../client/public/uploads'});

router.get('/products/', index);
router.get('/products/:id', urlencodedParser, show);
router.post('/products', upload.single('image'), create);
router.delete('/products/:id', urlencodedParser, destroy);
router.put('/products/:id', urlencodedParser, update);


module.exports = router;