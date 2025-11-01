var express = require('express');
var routes = express.Router();
const { DateTime } = require('luxon'); 

// Import all routers
var userRouter = require('./users/index');
var airlineRouter = require('./airlines/index');
var navigationRouter = require('./navigation/index');
var bookingRouter = require('./bookings/index');

// Attach all routers to the main router
routes.use('/users', userRouter);
routes.use('/airlines', airlineRouter);
routes.use('/navigate', navigationRouter);
routes.use('/bookings', bookingRouter);

routes.get ('/utcTime', (req, res) => {
    res.json({ utcTime: DateTime.utc().toISO() });
});

module.exports = routes;
