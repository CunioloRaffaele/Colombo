var express = require('express');
const controller = require('./controller');
const authMiddleware = require('../../middleware/auth');
const validateJsonRequest = require('../../middleware/validateJsonRequest');
var userRouter = express.Router();

userRouter.post ('/user', validateJsonRequest, controller.createNewAccount);
userRouter.post ('/login', validateJsonRequest, controller.logUserIn);
userRouter.get  ('/user', authMiddleware, controller.getAccountInfo);
userRouter.delete('/user', authMiddleware, controller.deleteAccount);
userRouter.get  ('/accounts', authMiddleware, controller.sudoListAccount);
userRouter.delete('/accounts/:id', authMiddleware, controller.sudoDeleteAccount);

module.exports = userRouter;
