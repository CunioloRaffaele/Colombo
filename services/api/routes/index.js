var express = require('express');
var routes = express.Router();

var userRouter = require('./users/index');
routes.use('/auth', userRouter);

var vehiclesRouter = require('./vehicles/index');
routes.use('/vehicles', vehiclesRouter);

var zoneRouter = require('./zones/index');
routes.use('/zones', zoneRouter);

var reportsRouter = require('./reports/index');
routes.use('/reports', reportsRouter);

routes.get('/ping', function(req, res) {
  res.status(200).json({ message: 'pong' });
});


module.exports = routes;