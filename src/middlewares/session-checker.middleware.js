const checkSession = (req, res, next) => {
  if (req.session && req.user) {
    return next();
  }
  return res.redirect('/api/auth/login');
}

module.exports = { checkSession };