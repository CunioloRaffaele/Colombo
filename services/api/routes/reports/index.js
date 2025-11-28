var express = require('express');
var reportsRouter = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');


//reportsRouter.get()

// Utenti cittadini


module.exports = reportsRouter;