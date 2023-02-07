const { Router } = require('express');
const passport = require('passport');
const { checkSession } = require('../middlewares/session-checker.middleware');
const { AuthRouter } = require('./auth.route');

const IndexRouter = Router();

IndexRouter.use('/auth', AuthRouter);

// Testing route
IndexRouter.get('/users', checkSession, (req, res) => { 
  res.send(['prathamesh', 'mayur'])
});

module.exports = { IndexRouter };