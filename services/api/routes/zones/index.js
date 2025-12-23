const express = require('express');
const zoneRouter = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');

// Salva una zona di interesse
zoneRouter.post('', validateJsonRequest, authMiddleware, controller.saveZone);
// Verifica se un punto è dentro una zona
zoneRouter.get('/contains/:lat/:lng', authMiddleware, controller.checkPointInZone);
// Elimina una o più zone di interesse
zoneRouter.delete('', validateJsonRequest, authMiddleware, controller.deleteZones);
// Restituisce la lista di zone vicine a un punto
zoneRouter.post('/near-point', validateJsonRequest, authMiddleware, controller.getZonesNearPoint);
// Restituisce tutti gli id delle zone del comune autenticato
zoneRouter.get('/ids', authMiddleware, controller.getZoneIdsByComune);
// Restituisce la geometria di una zona dato l'id
zoneRouter.get('/geometry/:id', authMiddleware, controller.getZoneGeometryById);
// Restituisce tutte le geometrie di un istat specifico (usato per mappa app client)
zoneRouter.get('/map/:istat', authMiddleware, controller.getZonesByComune);

module.exports = zoneRouter;