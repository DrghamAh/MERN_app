const express = require('express');
const {index, create, destroy, show, update} = require('../controllers/CategoryController');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended : false});

const router = express.Router();

router.get('/categories', index);
router.get('/categories/:id', urlencodedParser, show);
router.post('/categories', create);
router.delete('/categories', destroy);
router.put('/categories/:id', update);

module.exports = router;