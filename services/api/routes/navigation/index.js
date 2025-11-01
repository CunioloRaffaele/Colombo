var express = require('express');
const controller = require('./controller');
const authMiddleware = require('../../middleware/auth');
const checkAirlineEnrolled = require('../../middleware/checkAirlineEnrollment');
const validateJsonRequest = require('../../middleware/validateJsonRequest');
var navRouter = express.Router();

navRouter.post  ('/routes', validateJsonRequest, authMiddleware, checkAirlineEnrolled, controller.createRoute);
navRouter.get   ('/routes', controller.listRoutes);
navRouter.get   ('/routes/path', controller.getRouteBetweenAirports);
navRouter.get   ('/routes/:airlineName', controller.getRouteByAirline);
navRouter.get   ('/airports', controller.getAirports);
navRouter.get   ('/airports/:airportId', controller.getAirportDetails);
navRouter.get   ('/airports/:departure/routes', controller.getAirportsDesinations);
navRouter.get   ('/airports/:destination/incoming-routes', controller.getAirportsDepartures);
navRouter.post  ('/flights', validateJsonRequest, authMiddleware, checkAirlineEnrolled, controller.newFlight);
navRouter.delete('/flights/:flightUUID', authMiddleware, checkAirlineEnrolled, controller.deleteFlight);
navRouter.post  ('/flights/search', validateJsonRequest, controller.listFlights);
navRouter.get   ('/flights/:flightUUID', controller.getFlightDetails);

module.exports = navRouter;