var express = require('express');
var sessionRouter = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');

//Avvia sessione
sessionRouter.post('/start/:vin', authMiddleware, controller.startSession);

//Invia rilevazione
sessionRouter.post('/:id/readings', authMiddleware, controller.sendReadings);

//Scarica rilevazioni
sessionRouter.get('/:id', authMiddleware, controller.downloadReadings);

module.exports = sessionRouter;