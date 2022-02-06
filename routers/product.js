const express = require('express');
const { index, create, destroy, show, update } = require('../controllers/ProductController.js');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.get('/products/', index);
router.get('/products/:id', urlencodedParser, show);
router.post('/products', urlencodedParser, create);
router.delete('/products/:id', urlencodedParser, destroy);
router.put('/products/:id', urlencodedParser, update);


module.exports = router;