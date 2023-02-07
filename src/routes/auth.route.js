const { Router } = require("express");
const passport = require("passport");
const { ensureLoggedIn } = require("connect-ensure-login");

const AuthRouter = Router();
const AuthController = require("../controllers/auth.controller");

AuthRouter.get("/login", passport.authenticate("discord", { failureRedirect: "/healthcheck" }), AuthController.login);
AuthRouter.use("/discord/redirect", passport.authenticate("discord"), AuthController.loginRedirect);
AuthRouter.get("/logout", ensureLoggedIn({ redirectTo: "/api/auth/login" }), AuthController.logout);

module.exports = { AuthRouter };
