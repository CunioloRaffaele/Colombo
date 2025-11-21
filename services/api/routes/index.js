var express = require('express');
var routes = express.Router();
const { DateTime } = require('luxon'); 

// Import all routers
var userRouter = require('./users/index');
routes.use('/auth', userRouter);

var zoneRouter = require('./zones/index');
routes.use('/zones', zoneRouter);

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Responds with a pong message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
routes.get('/ping', function(req, res) {
  res.status(200).json({ message: 'pong' });
});

module.exports = routes;