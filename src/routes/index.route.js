const { Router } = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');

const { AuthRouter } = require('./auth.route');

const IndexRouter = Router();

IndexRouter.use('/auth', AuthRouter);

// Testing route
IndexRouter.get('/users', ensureLoggedIn({ redirectTo: '/api/auth/login' }), (req, res) => { 
  console.log("requst user =======> ", req.user)
  res.send(['prathamesh', 'mayur'])
});

module.exports = { IndexRouter };