const express = require('express');
const {index, create} = require('../controllers/OrderController');

const orderRouter = express.Router();

orderRouter.get('/orders', index);
orderRouter.post('/orders', create);

module.exports = orderRouter;