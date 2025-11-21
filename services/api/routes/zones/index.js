const express = require('express');
const zoneRouter = express.Router();
const controller = require('./controller');

const validateJsonRequest = require('../../middleware/validateJsonRequest');

/**
 * @swagger
 * components:
 *   schemas:
 *     Zone:
 *       type: object
 *       required:
 *         - id_comune
 *         - coordinates
 *       properties:
 *         id_comune:
 *           type: integer
 *           description: ID del comune a cui appartiene la zona
 *         coordinates:
 *           type: array
 *           description: Array di coordinate [lng, lat] che definiscono il poligono della zona
 *           items:
 *             type: array
 *             items:
 *               type: number
 *           example:
 *             - [12.4924, 41.8902]
 *             - [12.4964, 41.8902]
 *             - [12.4964, 41.8862]
 *             - [12.4924, 41.8862]
 *             - [12.4924, 41.8902]
 *     ZoneResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Zona salvata correttamente"
 *     PointInZone:
 *       type: object
 *       required:
 *         - areaId
 *         - point
 *       properties:
 *         areaId:
 *           type: integer
 *           description: ID della zona da verificare
 *         point:
 *           type: array
 *           description: Coordinate del punto [lng, lat]
 *           items:
 *             type: number
 *           example: [12.4944, 41.8882]
 *     ContainsResponse:
 *       type: object
 *       properties:
 *         contains:
 *           type: boolean
 *           description: True se il punto è dentro la zona, false altrimenti
 */

/**
 * @swagger
 * /zones:
 *   post:
 *     summary: Salva una nuova zona di interesse
 *     description: Crea una nuova area geografica definita da un poligono di coordinate. Il poligono viene automaticamente chiuso se necessario.
 *     tags: [Zone]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       201:
 *         description: Zona salvata con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZoneResponse'
 *           application/x-protobuf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Dati mancanti o non validi (servono almeno 3 coordinate)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore nel salvataggio della zona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
zoneRouter.post('/', validateJsonRequest, controller.saveZone);

/**
 * @swagger
 * /zones/contains:
 *   post:
 *     summary: Verifica se un punto è contenuto in una zona
 *     description: Controlla se un punto geografico specificato dalle coordinate si trova all'interno di una zona precedentemente salvata
 *     tags: [Zone]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PointInZone'
 *     responses:
 *       200:
 *         description: Verifica completata con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContainsResponse'
 *           application/x-protobuf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Dati mancanti o non validi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore nella verifica del punto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
zoneRouter.post('/contains', validateJsonRequest, controller.checkPointInZone);

module.exports = zoneRouter;