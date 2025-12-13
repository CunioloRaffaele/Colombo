var express = require('express');
var reportsRouter = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');

//Ecoscore totale comune
reportsRouter.get('/comune/:istat/ecoscore', authMiddleware, controller.ecoscoreComune);

//Ecoscore totale sessione - cittadino
reportsRouter.get('/session/:id/summary', authMiddleware, controller.ecoscoreSessione);

//Ecoscore totale cittadino
reportsRouter.get('/user/:email/summary', authMiddleware, controller.ecoscoreUtente);

// Sessioni utente: conteggio totale
reportsRouter.get('/user/sessions', authMiddleware, controller.getUserSessionsCount);
// Sessioni utente: lista dettagliata per mese/anno
reportsRouter.get('/user/sessions/:mm/:aaaa', authMiddleware, controller.getUserSessionsListByMonthYear);

module.exports = reportsRouter;