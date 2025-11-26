var express = require('express');
var vehiclesRouter = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');

// Vetture
vehiclesRouter.get('/car/details/:vin', authMiddleware, controller.getCarInfo);
vehiclesRouter.delete('/car/:vin', authMiddleware, controller.removeCarFromUser);
vehiclesRouter.post('/car', validateJsonRequest, authMiddleware, controller.addCarToUser);
vehiclesRouter.get('/cars', authMiddleware, controller.listUserCars);

module.exports = vehiclesRouter;