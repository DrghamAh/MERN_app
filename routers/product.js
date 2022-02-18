const express = require('express');
const { index, create, destroy, show, update } = require('../controllers/ProductController.js');
const bodyParser = require('body-parser');
const isAuthenticated = require('../middlewares/authMiddleware.js');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.get('/products/', index);
router.get('/products/:id', urlencodedParser, show);
router.post('/products', isAuthenticated, urlencodedParser, create);
router.delete('/products/:id', isAuthenticated, urlencodedParser, destroy);
router.put('/products/:id', isAuthenticated, urlencodedParser, update);


module.exports = router;