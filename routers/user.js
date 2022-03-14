const express = require('express');
const {index, create, show, update, destroy, favorites, addFavorite, deleteFavorite} = require('../controllers/UserController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.get('/users', isAuthenticated, index);
userRouter.get('/users/:id', show);
userRouter.post('/users', create);
userRouter.put('/users/:id', update);
userRouter.delete('/users/:id', isAuthenticated, isAdmin, destroy);

userRouter.get('/users/:id/favorites', favorites);
userRouter.post('/users/:id/favorites', addFavorite);
userRouter.delete('/users/:id/favorites/:product_id', deleteFavorite);

module.exports = userRouter;
