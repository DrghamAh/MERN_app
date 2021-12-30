const express = require('express');
const {index, create, destroy, show, update} = require('../controllers/CategoryController');

const router = express.Router();

router.get('/categories', index);
router.post('/categories/create', create);
router.get('/categories/show', show);
router.delete('/categories/delete', destroy);
router.post('/categories/update', update);

module.exports = router;