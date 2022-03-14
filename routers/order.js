const express = require('express');
const {index, create, show, products, destroy} = require('../controllers/OrderController');
const { isAuthenticated, isAdmin} = require('../middlewares/authMiddleware');

const orderRouter = express.Router();

orderRouter.get('/orders', index);
orderRouter.post('/orders', create);
orderRouter.get('/orders/:id', show);
orderRouter.get('/orders/:id/products', products);
orderRouter.delete('/orders/:id', destroy);

module.exports = orderRouter;