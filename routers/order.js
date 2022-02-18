const express = require('express');
const {index, create} = require('../controllers/OrderController');
const isAuthenticated = require('../middlewares/authMiddleware');

const orderRouter = express.Router();

orderRouter.get('/orders', index);
orderRouter.post('/orders', isAuthenticated, create);

module.exports = orderRouter;