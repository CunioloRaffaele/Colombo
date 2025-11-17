const express = require('express');
const zoneRouter = express.Router();
const controller = require('./controller');

const validateJsonRequest = require('../../middleware/validateJsonRequest');

// Salva una zona di interesse
zoneRouter.post('/', validateJsonRequest, controller.saveZone);

// Verifica se un punto è dentro una zona
zoneRouter.post('/contains', validateJsonRequest, controller.checkPointInZone);

module.exports = zoneRouter;