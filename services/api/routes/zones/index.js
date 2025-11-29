const express = require('express');
const zoneRouter = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');

// Salva una zona di interesse
zoneRouter.post('/', validateJsonRequest, authMiddleware, controller.saveZone);
// Verifica se un punto è dentro una zona
zoneRouter.post('/contains', validateJsonRequest, authMiddleware, controller.checkPointInZone);
// Elimina una o più zone di interesse
zoneRouter.delete('/', validateJsonRequest, authMiddleware, controller.deleteZones);
// Restituisce la lista di zone vicine a un punto
zoneRouter.post('/near-point', validateJsonRequest, authMiddleware, controller.getZonesNearPoint);

module.exports = zoneRouter;