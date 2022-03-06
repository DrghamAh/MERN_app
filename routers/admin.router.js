const express = require('express');
const { register, login } = require('../controllers/AdminController');

const adminRouter = express.Router();

adminRouter.post('/admin/register', register);
adminRouter.post('/admin/login', login);

module.exports = adminRouter;