const express = require('express');
const { index, create, show, update, destroy } = require('../controllers/RatingController');

const RatingRouter = express.Router();

RatingRouter.get('/ratings', index);
RatingRouter.get('/ratings/:id', show);
RatingRouter.post('/ratings', create);
RatingRouter.put('/ratings/:id', update);
RatingRouter.delete('/rating/:id', destroy);

module.exports = RatingRouter;