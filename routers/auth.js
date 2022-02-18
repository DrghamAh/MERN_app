const express = require('express');
const {register, login} = require('../controllers/AuthController');

const authRouter = express.Router();

authRouter.post('/auth/register', register);
authRouter.post('/auth/login', login);

module.exports = authRouter;
