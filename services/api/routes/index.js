var express = require('express');
var routes = express.Router();

var userRouter = require('./users/index');
routes.use('/users', userRouter);


module.exports = routes;
