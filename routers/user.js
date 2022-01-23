const express = require('express');
const {index, create, show, update, destroy} = require('../controllers/UserController');

const userRouter = express.Router();

userRouter.get('/users', index);
userRouter.get('/users/:id', show);
userRouter.post('/users', create);
userRouter.put('/users/:id', update);
userRouter.delete('/users/:id', destroy);

module.exports = userRouter;

