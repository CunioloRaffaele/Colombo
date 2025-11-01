var express = require('express');
const controller = require('./controller');
const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');
var bookRouter = express.Router();

bookRouter.get('/booking/:id/download', authMiddleware, controller.downloadBooking);
bookRouter.get('/booking/:id', authMiddleware, controller.getBookingDetails);
bookRouter.get('/tickets/:flightUUID', controller.listTickets);
bookRouter.get('/seats/:flightUUID', controller.getFlightAvailableSeats);
bookRouter.get('/extras', controller.getFlightExtras);
bookRouter.post('/trips', validateJsonRequest, authMiddleware, controller.createTrip);
bookRouter.get('/trips', authMiddleware, controller.listTrips);
bookRouter.get('/trips/:tripId', authMiddleware, controller.getTripDetails);

module.exports = bookRouter;