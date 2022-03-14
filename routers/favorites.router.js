const express = require('express');
const { create, products } = require('../controllers/FavoriteController');
const favoritesRouter = express.Router();

// favoritesRouter.post('/users/:id/favorites', create);

module.exports = favoritesRouter;

