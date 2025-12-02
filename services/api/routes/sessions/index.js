var express = require('express');
var reportsRouter = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');

//Avvia sessione
reportsRouter.post('/start', authMiddleware, controller.startSession);

//Invia rilevazione
reportsRouter.post('/:id/readings', authMiddleware, controller.sendReadings);

//Scarica rilevazioni
reportsRouter.get('/:id', authMiddleware, controller.downloadReadings);

module.exports = reportsRouter;