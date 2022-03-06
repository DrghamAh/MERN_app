const express = require('express');
const { index, create, show, update, destroy } = require('../controllers/RatingController');
const { isAdmin, isAuthenticated} = require('../middlewares/authMiddleware');

const RatingRouter = express.Router();

RatingRouter.get('/ratings', index);
RatingRouter.get('/ratings/:id', show);
RatingRouter.post('/ratings', isAuthenticated, create);
RatingRouter.put('/ratings/:id', isAdmin, update);
RatingRouter.delete('/rating/:id', isAuthenticated, destroy);

module.exports = RatingRouter;