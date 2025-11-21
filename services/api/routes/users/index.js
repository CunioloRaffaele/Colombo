var express = require('express');
var userRouter = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');

/**
 * @swagger
 * components:
 *   schemas:
 *     Cittadino:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - password
 *         - data_nascita
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome del cittadino
 *         email:
 *           type: string
 *           format: email
 *           description: Email del cittadino
 *         password:
 *           type: string
 *           format: password
 *           description: Password del cittadino
 *         data_nascita:
 *           type: string
 *           format: date
 *           description: Data di nascita del cittadino
 *     Comune:
 *       type: object
 *       required:
 *         - nome
 *         - provincia
 *         - regione
 *         - email
 *         - password
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome del comune
 *         provincia:
 *           type: string
 *           description: Provincia del comune
 *         regione:
 *           type: string
 *           description: Regione del comune
 *         email:
 *           type: string
 *           format: email
 *           description: Email del comune
 *         password:
 *           type: string
 *           format: password
 *           description: Password del comune
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         token:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /auth/user:
 *   post:
 *     summary: Registrazione di un nuovo cittadino
 *     tags: [Autenticazione]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cittadino'
 *     responses:
 *       201:
 *         description: Account creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Dati mancanti o non validi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.post('/user', validateJsonRequest, controller.registerUser);

/**
 * @swagger
 * /auth/login/user:
 *   post:
 *     summary: Login di un cittadino
 *     tags: [Autenticazione]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login effettuato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Credenziali non valide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.post('/login/user', validateJsonRequest, controller.loginUser);

/**
 * @swagger
 * /auth/comune:
 *   post:
 *     summary: Registrazione di un nuovo comune
 *     tags: [Autenticazione]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comune'
 *     responses:
 *       201:
 *         description: Comune creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Dati mancanti o non validi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.post('/comune', validateJsonRequest, controller.registerComune);

/**
 * @swagger
 * /auth/login/comune:
 *   post:
 *     summary: Login di un comune
 *     tags: [Autenticazione]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login effettuato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Credenziali non valide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.post('/login/comune', validateJsonRequest, controller.loginComune);

/**
 * @swagger
 * /auth/comuni:
 *   get:
 *     summary: Recupera tutti i comuni registrati
 *     tags: [Comuni]
 *     responses:
 *       200:
 *         description: Lista di comuni
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   provincia:
 *                     type: string
 *                   regione:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Errore durante il recupero dei comuni
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.get('/comuni', controller.getAllComuni);

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Recupera le informazioni dell'account cittadino autenticato
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informazioni dell'account cittadino
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 data_nascita:
 *                   type: string
 *                   format: date
 *       401:
 *         description: Non autenticato
 *       404:
 *         description: Utente non trovato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.get('/user', authMiddleware, controller.getUserAccountInfo);

/**
 * @swagger
 * /auth/comune:
 *   get:
 *     summary: Recupera le informazioni dell'account comune autenticato
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informazioni dell'account comune
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 provincia:
 *                   type: string
 *                 regione:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Non autenticato
 *       404:
 *         description: Comune non trovato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.get('/comune', authMiddleware, controller.getComuneAccountInfo);


module.exports = userRouter;
