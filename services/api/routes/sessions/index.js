var express = require('express');
var sessionRouter = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');

//Avvia sessione
sessionRouter.post('/start/:vin', authMiddleware, controller.startSession);

//Termina sessione
sessionRouter.post('/end/:id', validateJsonRequest, authMiddleware, controller.endSession);

//Invia rilevazione
sessionRouter.post('/:id/readings', validateJsonRequest, authMiddleware, controller.sendReadings);

//Scarica rilevazioni
sessionRouter.get('/:id', authMiddleware, controller.downloadReadings);

module.exports = sessionRouter;