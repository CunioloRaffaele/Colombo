var express = require('express');
var userRouter = express.Router();
const controller = require('./controller');

const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');


// Utenti cittadini
userRouter.post('/user', validateJsonRequest, controller.registerUser);
userRouter.post('/login/user', validateJsonRequest, controller.loginUser);
userRouter.put('/user', validateJsonRequest, authMiddleware, controller.updateUser);
userRouter.delete('/user', validateJsonRequest, authMiddleware, controller.deleteUser);

// Comuni
userRouter.post('/comune', validateJsonRequest, controller.registerComune);
userRouter.post('/login/comune', validateJsonRequest, controller.loginComune);
userRouter.get('/comuni', controller.getAllComuni);
userRouter.get('/comuni/search', controller.searchComuni);

// Informazioni account
userRouter.get('/user', authMiddleware, controller.getUserAccountInfo);
userRouter.get('/comune', authMiddleware, controller.getComuneAccountInfo);

module.exports = userRouter;