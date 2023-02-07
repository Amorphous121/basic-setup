exports.login = (req, res, next) => {
  try {
    res.send('Login Successful');
  } catch (error) {
    next(error);
  }
}

exports.loginRedirect = (req, res, next) => {
  try {
    res.send("ok");
  } catch (error) {
    next(error);
  }
}

exports.logout = (req, res, next) => {
  req.session.destroy();
  res.send('Logout successfull');
}
