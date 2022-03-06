const express = require('express');
const {index, create} = require('../controllers/OrderController');
const { isAuthenticated, isAdmin} = require('../middlewares/authMiddleware');

const orderRouter = express.Router();

orderRouter.get('/orders', index);
orderRouter.post('/orders', create);

module.exports = orderRouter;