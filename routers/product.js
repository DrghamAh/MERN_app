const express = require('express');
const { index, create, destroy, show, update } = require('../controllers/ProductController.js');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.get('/products/', index);
router.get('/products/show', urlencodedParser, show);
router.post('/products/create', urlencodedParser, create);
router.post('/products/delete', urlencodedParser, destroy);
router.post('/products/update', urlencodedParser, update);


module.exports = router;