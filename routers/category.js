const express = require('express');
const {index, create, destroy, show, update} = require('../controllers/CategoryController');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const isAuthenticated = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/categories', index);
router.get('/categories/:id', show);
router.post('/categories', isAuthenticated, create);
router.delete('/categories/:id', isAuthenticated, destroy);
router.put('/categories/:id', isAuthenticated, update);

module.exports = router;