const { Router } = require('express');
const passport = require('passport');
const AuthRouter = Router();
const AuthController = require('../controllers/auth.controller');
const { checkSession } = require('../middlewares/session-checker.middleware');

AuthRouter.get('/login', passport.authenticate('discord', { failureRedirect: '/healthcheck' }), AuthController.login);
AuthRouter.use('/discord/redirect', passport.authenticate('discord'), AuthController.loginRedirect);
AuthRouter.get('/logout', checkSession, AuthController.logout);

module.exports = { AuthRouter };